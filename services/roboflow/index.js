const crypto = require("node:crypto");
const fsp = require("node:fs/promises");
const path = require("node:path");

const API_URL = process.env.ROBOFLOW_API_URL || "https://serverless.roboflow.com";
const WORKSPACE = process.env.ROBOFLOW_WORKSPACE || "aluas-workspace-qi0vz";
const WORKFLOW_ID = process.env.ROBOFLOW_WORKFLOW_ID || "find-french-friesm-onion-and-others-logic";
const WORKFLOW_NAME = process.env.ROBOFLOW_WORKFLOW_NAME || "food detrction";
const MODEL_VERSION = process.env.ROBOFLOW_MODEL_VERSION || "v3";
const IMAGE_INPUT_NAME = process.env.ROBOFLOW_IMAGE_INPUT || "image";
const TIMEOUT_MS = Number(process.env.ROBOFLOW_TIMEOUT_MS || 3000);
const MAX_ATTEMPTS = Math.max(1, Number(process.env.ROBOFLOW_MAX_ATTEMPTS || 2));
const ARTIFACT_DIR = path.resolve(
  process.env.ROBOFLOW_OUTPUT_DIR || path.join(__dirname, "..", "..", "data", "roboflow-outputs")
);
const RUN_ENDPOINT =
  process.env.ROBOFLOW_RUN_ENDPOINT || `${API_URL}/${WORKSPACE}/workflows/${WORKFLOW_ID}`;

class RoboflowIntegrationError extends Error {
  constructor(message, code, statusCode, cause) {
    super(message);
    this.name = "RoboflowIntegrationError";
    this.code = code;
    this.statusCode = statusCode || 0;
    this.cause = cause;
  }
}

function getWorkflowMetadata() {
  return {
    name: WORKFLOW_NAME,
    workspace: WORKSPACE,
    workflowId: WORKFLOW_ID,
    modelVersion: MODEL_VERSION,
    apiUrl: API_URL,
    runEndpoint: RUN_ENDPOINT,
    imageInput: IMAGE_INPUT_NAME,
    timeoutMs: TIMEOUT_MS,
    maxAttempts: MAX_ATTEMPTS,
    futureExpansion: [
      "burned_food",
      "damaged_packaging",
      "rotten_vegetables",
      "wrong_product",
      "missing_ingredients",
      "multiple_products",
      "multiple_write_offs"
    ]
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWorkflowParameters() {
  if (!process.env.ROBOFLOW_PARAMETERS_JSON) return {};

  try {
    const parsed = JSON.parse(process.env.ROBOFLOW_PARAMETERS_JSON);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    throw new RoboflowIntegrationError("ROBOFLOW_PARAMETERS_JSON must be valid JSON.", "invalid_parameters", 0, error);
  }
}

function normalizeImage(image) {
  if (!image || typeof image !== "string") {
    throw new Error("Image is required.");
  }

  const commaIndex = image.indexOf(",");
  if (image.startsWith("data:") && commaIndex >= 0) {
    return image.slice(commaIndex + 1);
  }

  return image;
}

function getWorkflowRequestShape() {
  return {
    apiUrl: API_URL,
    workspaceName: WORKSPACE,
    workflowId: WORKFLOW_ID,
    endpoint: RUN_ENDPOINT,
    inputs: {
      [IMAGE_INPUT_NAME]: "image"
    },
    parameters: getWorkflowParameters()
  };
}

function normalizeConfidence(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(100, number <= 1 ? number * 100 : number));
}

function pickName(object) {
  return (
    object.class ||
    object.class_name ||
    object.name ||
    object.label ||
    object.product ||
    object.detected_product ||
    object.displayName ||
    "Unknown product"
  );
}

function normalizeBox(object) {
  const box = object.bbox || object.bounding_box || object.boundingBox || object.box || object;
  const x = Number(box.x ?? box.left ?? box.xmin ?? box.minX ?? 0);
  const y = Number(box.y ?? box.top ?? box.ymin ?? box.minY ?? 0);
  const width = Number(box.width ?? box.w ?? (box.xmax && box.xmin ? box.xmax - box.xmin : 0));
  const height = Number(box.height ?? box.h ?? (box.ymax && box.ymin ? box.ymax - box.ymin : 0));

  return {
    x: Number.isFinite(x) ? x : 0,
    y: Number.isFinite(y) ? y : 0,
    width: Number.isFinite(width) ? width : 0,
    height: Number.isFinite(height) ? height : 0,
    imageWidth: Number(object.image_width || object.imageWidth || 640),
    imageHeight: Number(object.image_height || object.imageHeight || 420)
  };
}

function looksLikeDetection(object) {
  if (!object || typeof object !== "object" || Array.isArray(object)) return false;
  const keys = ["class", "class_name", "name", "label", "product", "confidence", "score", "bbox", "bounding_box"];
  return keys.some((key) => Object.prototype.hasOwnProperty.call(object, key));
}

function parseJsonString(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed || (!trimmed.startsWith("{") && !trimmed.startsWith("["))) return value;

  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function decodeJsonStrings(node, depth = 0) {
  if (!node || depth > 8) return node;
  const parsed = parseJsonString(node);
  if (parsed !== node) return decodeJsonStrings(parsed, depth + 1);

  if (Array.isArray(node)) {
    return node.map((item) => decodeJsonStrings(item, depth + 1));
  }

  if (typeof node === "object") {
    return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, decodeJsonStrings(value, depth + 1)]));
  }

  return node;
}

function extractOutputKeys(response) {
  const decoded = decodeJsonStrings(response);
  if (Array.isArray(decoded) && decoded[0] && typeof decoded[0] === "object" && !Array.isArray(decoded[0])) {
    return Object.keys(decoded[0]);
  }
  if (decoded && typeof decoded === "object" && !Array.isArray(decoded)) {
    return Object.keys(decoded);
  }
  return [];
}

function collectPredictionArrays(node, arrays = [], depth = 0) {
  node = parseJsonString(node);
  if (!node || depth > 8) return arrays;

  if (Array.isArray(node)) {
    if (node.some(looksLikeDetection)) {
      arrays.push(node.filter(looksLikeDetection));
      return arrays;
    }

    node.forEach((child) => collectPredictionArrays(child, arrays, depth + 1));
    return arrays;
  }

  if (typeof node === "object") {
    Object.values(node).forEach((child) => collectPredictionArrays(child, arrays, depth + 1));
  }

  return arrays;
}

function looksLikeSummary(object) {
  if (!object || typeof object !== "object" || Array.isArray(object)) return false;
  const nameKeys = ["class", "class_name", "name", "label", "product", "detected_product", "displayName"];
  const countKeys = ["quantity", "count", "objectCount", "object_count", "product_count"];
  const confidenceKeys = ["confidence", "score", "probability", "prob"];
  const hasName = nameKeys.some((key) => Object.prototype.hasOwnProperty.call(object, key));
  const hasCount = countKeys.some((key) => Object.prototype.hasOwnProperty.call(object, key));
  const hasConfidence = confidenceKeys.some((key) => Object.prototype.hasOwnProperty.call(object, key));
  return hasName && (hasCount || hasConfidence);
}

function collectSummaryObjects(node, summaries = [], depth = 0) {
  node = parseJsonString(node);
  if (!node || depth > 8) return summaries;

  if (Array.isArray(node)) {
    node.forEach((child) => collectSummaryObjects(child, summaries, depth + 1));
    return summaries;
  }

  if (typeof node === "object") {
    if (looksLikeSummary(node)) summaries.push(node);
    Object.values(node).forEach((child) => collectSummaryObjects(child, summaries, depth + 1));
  }

  return summaries;
}

function collectTextValues(node, texts = [], depth = 0) {
  if (!node || depth > 8) return texts;

  if (typeof node === "string") {
    texts.push(node);
    return texts;
  }

  if (Array.isArray(node)) {
    node.forEach((child) => collectTextValues(child, texts, depth + 1));
    return texts;
  }

  if (typeof node === "object") {
    Object.values(node).forEach((child) => collectTextValues(child, texts, depth + 1));
  }

  return texts;
}

function parseTextSummary(text) {
  const knownProducts = [
    { product: "French Fries", patterns: ["french fries", "fries", "chips", "картофель фри", "фри"] },
    { product: "Onion Rings", patterns: ["onion rings", "onion", "луковые кольца", "лук", "пияз"] },
    { product: "Burger Bun", patterns: ["burger bun", "bun", "bread", "булочка", "тоқаш"] },
    { product: "Cheese", patterns: ["cheese", "сыр", "ірімшік"] },
    { product: "Tomato", patterns: ["tomato", "помидор", "қызанақ"] },
    { product: "Chicken Patty", patterns: ["chicken patty", "patty", "cutlet", "котлета", "тауық"] },
    { product: "Burned Food", patterns: ["burned", "burnt", "сгор", "күйген"] },
    { product: "Damaged Packaging", patterns: ["damaged packaging", "package", "упаков", "қаптама"] },
    { product: "Rotten Vegetables", patterns: ["rotten", "vegetables", "овощ", "көкөніс"] }
  ];
  const productMatch = text.match(/(?:detected product|product|class|label|товар|продукт)\s*[:=-]\s*([^\n,;]+)/i);
  const lowerText = text.toLowerCase();
  const product =
    productMatch?.[1]?.trim() ||
    knownProducts.find((item) => item.patterns.some((pattern) => lowerText.includes(pattern)))?.product;
  if (!product) return null;

  const confidenceMatch = text.match(/(\d{1,3}(?:\.\d+)?)\s*%/);
  const quantityMatch = text.match(/(?:quantity|count|qty|количество)\s*[:=-]?\s*(\d+)/i);

  return {
    product,
    quantity: quantityMatch ? Number(quantityMatch[1]) : 1,
    confidence: confidenceMatch ? Number(confidenceMatch[1]) : 0
  };
}

function normalizeDetection(object) {
  return {
    product: String(pickName(object)),
    confidence: normalizeConfidence(object.confidence ?? object.score ?? object.probability ?? object.prob),
    boundingBox: normalizeBox(object)
  };
}

function normalizeSummary(object) {
  const quantity = Number(
    object.quantity ?? object.count ?? object.objectCount ?? object.object_count ?? object.product_count ?? 1
  );
  return {
    name: String(pickName(object)),
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    confidence: normalizeConfidence(object.confidence ?? object.score ?? object.probability ?? object.prob),
    boundingBoxes: Array.isArray(object.boundingBoxes || object.bounding_boxes || object.boxes)
      ? (object.boundingBoxes || object.bounding_boxes || object.boxes).map(normalizeBox)
      : []
  };
}

function parseWorkflowResponse(response) {
  const decodedResponse = decodeJsonStrings(response);
  const outputKeys = extractOutputKeys(decodedResponse);
  const predictionArrays = collectPredictionArrays(decodedResponse);
  const detections = predictionArrays.flat().map(normalizeDetection);
  const productMap = new Map();

  detections.forEach((detection) => {
    const key = detection.product;
    const existing = productMap.get(key) || {
      name: key,
      quantity: 0,
      confidenceTotal: 0,
      boundingBoxes: []
    };

    existing.quantity += 1;
    existing.confidenceTotal += detection.confidence;
    existing.boundingBoxes.push(detection.boundingBox);
    productMap.set(key, existing);
  });

  let products = [...productMap.values()]
    .map((item) => ({
      name: item.name,
      quantity: item.quantity,
      confidence: Math.round(item.confidenceTotal / Math.max(1, item.quantity)),
      boundingBoxes: item.boundingBoxes
    }))
    .sort((a, b) => b.quantity - a.quantity || b.confidence - a.confidence);

  if (!products.length) {
    products = collectSummaryObjects(decodedResponse).map(normalizeSummary);
  }

  if (!products.length) {
    products = collectTextValues(decodedResponse)
      .map(parseTextSummary)
      .filter(Boolean)
      .map(normalizeSummary);
  }

  const top = products[0] || {
    name: "",
    quantity: 0,
    confidence: 0,
    boundingBoxes: []
  };
  const objectCount =
    detections.length || products.reduce((total, product) => total + Number(product.quantity || 0), 0);

  return {
    workflow: getWorkflowMetadata(),
    outputKeys,
    detectedProducts: products,
    detectedProduct: top.name,
    quantity: top.quantity,
    confidence: top.confidence,
    boundingBoxes: top.boundingBoxes,
    objectCount,
    lowConfidence: top.confidence < 70,
    parsedAt: new Date().toISOString()
  };
}

function countProducts(input) {
  const parsed = input && input.detectedProducts ? input : parseWorkflowResponse(input);
  return parsed.detectedProducts.reduce((total, product) => total + product.quantity, 0);
}

function extractConfidence(input) {
  const parsed = input && typeof input.confidence === "number" ? input : parseWorkflowResponse(input);
  return parsed.confidence;
}

async function postWorkflow(base64Image, attempt) {
  const apiKey = process.env.ROBOFLOW_API_KEY;
  const parameters = getWorkflowParameters();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const body = {
      api_key: apiKey,
      inputs: {
        [IMAGE_INPUT_NAME]: {
          type: "base64",
          value: base64Image
        }
      }
    };

    if (Object.keys(parameters).length) {
      body.parameters = parameters;
    }

    const response = await fetch(RUN_ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new RoboflowIntegrationError(
        `Roboflow responded with ${response.status}: ${errorText.slice(0, 240)}`,
        "bad_response",
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new RoboflowIntegrationError("Roboflow request timed out.", "timeout", 0, error);
    }
    if (error instanceof RoboflowIntegrationError) throw error;
    throw new RoboflowIntegrationError("Roboflow request failed.", "request_failed", 0, error);
  } finally {
    clearTimeout(timeout);
  }
}

function detectImageEncoding(value) {
  if (typeof value !== "string") return null;

  const dataUrlMatch = value.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  const compact = (dataUrlMatch ? dataUrlMatch[2] : value).replace(/\s+/g, "");
  if (compact.length < 512 || !/^[a-z0-9+/]+={0,2}$/i.test(compact)) return null;

  let buffer;
  try {
    buffer = Buffer.from(compact, "base64");
  } catch {
    return null;
  }
  if (buffer.length < 16) return null;

  const signatures = [
    {
      mimeType: "image/png",
      extension: "png",
      test: () => buffer.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))
    },
    {
      mimeType: "image/jpeg",
      extension: "jpg",
      test: () => buffer[0] === 0xff && buffer[1] === 0xd8
    },
    {
      mimeType: "image/webp",
      extension: "webp",
      test: () =>
        buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP"
    },
    {
      mimeType: "image/gif",
      extension: "gif",
      test: () => buffer.subarray(0, 3).toString("ascii") === "GIF"
    }
  ];
  const match = signatures.find((signature) => signature.test());
  if (!match && !dataUrlMatch) return null;

  return {
    buffer,
    mimeType: dataUrlMatch?.[1] || match.mimeType,
    extension: match?.extension || dataUrlMatch[1].split("/")[1] || "bin"
  };
}

function normalizeArtifactPath(filePath) {
  return path.relative(path.join(__dirname, "..", ".."), filePath).replaceAll(path.sep, "/");
}

async function persistImageOutputs(node, breadcrumb = []) {
  if (typeof node === "string") {
    const image = detectImageEncoding(node);
    if (!image) return { value: node, artifacts: [] };

    await fsp.mkdir(ARTIFACT_DIR, { recursive: true });
    const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}-${crypto.randomUUID()}.${image.extension}`;
    const filePath = path.join(ARTIFACT_DIR, filename);
    await fsp.writeFile(filePath, image.buffer);

    const artifact = {
      type: "image",
      outputPath: breadcrumb.join(".") || "workflow_output",
      file: normalizeArtifactPath(filePath),
      mimeType: image.mimeType,
      bytes: image.buffer.length
    };

    return {
      value: {
        roboflowArtifact: true,
        type: artifact.type,
        file: artifact.file,
        mimeType: artifact.mimeType,
        bytes: artifact.bytes
      },
      artifacts: [artifact]
    };
  }

  if (Array.isArray(node)) {
    const items = await Promise.all(node.map((child, index) => persistImageOutputs(child, [...breadcrumb, String(index)])));
    return {
      value: items.map((item) => item.value),
      artifacts: items.flatMap((item) => item.artifacts)
    };
  }

  if (node && typeof node === "object") {
    const entries = await Promise.all(
      Object.entries(node).map(async ([key, value]) => {
        const result = await persistImageOutputs(value, [...breadcrumb, key]);
        return [key, result.value, result.artifacts];
      })
    );

    return {
      value: Object.fromEntries(entries.map(([key, value]) => [key, value])),
      artifacts: entries.flatMap((entry) => entry[2])
    };
  }

  return { value: node, artifacts: [] };
}

async function runFoodDetectionWorkflow(image) {
  const base64Image = normalizeImage(image);
  return postWorkflow(base64Image, 1);
}

function createDemoWorkflowResponse() {
  return {
    outputs: [
      {
        predictions: {
          predictions: [
            {
              class: "Chicken Patty",
              confidence: 0.96,
              x: 268,
              y: 166,
              width: 155,
              height: 118,
              image_width: 640,
              image_height: 420
            },
            {
              class: "Chicken Patty",
              confidence: 0.95,
              x: 420,
              y: 176,
              width: 146,
              height: 110,
              image_width: 640,
              image_height: 420
            }
          ]
        }
      }
    ]
  };
}

function createManualFallback(error, options = {}) {
  return {
    workflow: getWorkflowMetadata(),
    source: "manual_fallback",
    requiresApiKey: Boolean(options.requiresApiKey),
    detectedProducts: [],
    detectedProduct: "",
    quantity: 0,
    confidence: 0,
    boundingBoxes: [],
    objectCount: 0,
    lowConfidence: true,
    error: error ? String(error.message || error) : "Roboflow unavailable.",
    parsedAt: new Date().toISOString()
  };
}

async function detectObjects(image) {
  const base64Image = normalizeImage(image);

  if (!process.env.ROBOFLOW_API_KEY) {
    return {
      source: "manual_fallback",
      response: createManualFallback(new Error("ROBOFLOW_API_KEY is not configured."), { requiresApiKey: true })
    };
  }

  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return {
        source: "roboflow",
        response: await postWorkflow(base64Image, attempt)
      };
    } catch (error) {
      lastError = error;
      const isClientError = error.statusCode >= 400 && error.statusCode < 500;
      if (isClientError || attempt === MAX_ATTEMPTS) {
        break;
      }
      await sleep(200 * attempt);
    }
  }

  return {
    source: "manual_fallback",
    response: createManualFallback(lastError)
  };
}

async function analyzeImage(image) {
  const startedAt = Date.now();
  const result = await detectObjects(image);

  if (result.source === "manual_fallback") {
    return {
      ...result.response,
      latencyMs: Date.now() - startedAt
    };
  }

  const decodedResponse = decodeJsonStrings(result.response);
  const persisted = await persistImageOutputs(decodedResponse);
  const parsed = parseWorkflowResponse(persisted.value);
  return {
    ...parsed,
    source: result.source,
    requiresApiKey: result.source === "demo_without_api_key",
    workflowArtifacts: persisted.artifacts,
    latencyMs: Date.now() - startedAt
  };
}

module.exports = {
  RoboflowIntegrationError,
  analyzeImage,
  detectObjects,
  runFoodDetectionWorkflow,
  parseWorkflowResponse,
  countProducts,
  extractConfidence,
  getWorkflowMetadata,
  getWorkflowRequestShape
};
