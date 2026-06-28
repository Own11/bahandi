const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

function loadLocalEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const separator = trimmed.indexOf("=");
    if (separator <= 0) return;

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (key && process.env[key] == null) process.env[key] = value;
  });
}

loadLocalEnv();

const roboflow = require("./services/roboflow");

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "data");
const REPORTS_FILE = path.join(DATA_DIR, "reports.json");
const DRAFTS_FILE = path.join(DATA_DIR, "drafts.json");
const STORES_FILE = path.join(DATA_DIR, "stores.json");
const PORT = Number(process.env.PORT || 4173);
const MAX_BODY_BYTES = 8 * 1024 * 1024;

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function sendError(response, statusCode, message, details) {
  sendJson(response, statusCode, {
    ok: false,
    error: message,
    details
  });
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fsp.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(file, data) {
  const temp = `${file}.${process.pid}.tmp`;
  await fsp.writeFile(temp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await fsp.rename(temp, file);
}

function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Payload is too large."));
        request.destroy();
        return;
      }
      body += chunk.toString("utf8");
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });

    request.on("error", reject);
  });
}

function sanitizePrediction(prediction) {
  if (!prediction || typeof prediction !== "object") return prediction;
  const { raw, ...publicPrediction } = prediction;
  return publicPrediction;
}

function isCorrected(aiPrediction, finalCorrection) {
  const aiProduct = String(aiPrediction?.detectedProduct || "").trim().toLowerCase();
  const finalProduct = String(finalCorrection.product || "").trim().toLowerCase();
  const aiQuantity = Number(aiPrediction?.quantity || 0);
  const finalQuantity = Number(finalCorrection.quantity || 0);

  if (!aiProduct) return Boolean(finalProduct);
  return aiProduct !== finalProduct || aiQuantity !== finalQuantity;
}

function calculateReportCost(product, quantity) {
  const prices = {
    "Chicken Patty": 1200,
    "French Fries": 650,
    "Onion Rings": 720,
    "Burger Bun": 180,
    Tomato: 140,
    Cheese: 260
  };
  return Math.max(1, Number(quantity || 1)) * (prices[product] || 500);
}

function localizeProduct(product, language = "ru") {
  const labels = {
    "Chicken Patty": { ru: "куриная котлета", en: "Chicken Patty", kz: "тауық котлеті" },
    "French Fries": { ru: "картофель фри", en: "French Fries", kz: "фри картобы" },
    "Onion Rings": { ru: "луковые кольца", en: "Onion Rings", kz: "пияз сақиналары" },
    "Burger Bun": { ru: "булочка", en: "Burger Bun", kz: "бургер тоқашы" },
    Tomato: { ru: "помидор", en: "Tomato", kz: "қызанақ" },
    Cheese: { ru: "сыр", en: "Cheese", kz: "ірімшік" },
    "Rotten Vegetables": { ru: "испорченные овощи", en: "Rotten Vegetables", kz: "бұзылған көкөніс" },
    "Damaged Packaging": { ru: "поврежденная упаковка", en: "Damaged Packaging", kz: "зақымдалған қаптама" },
    "Burned Food": { ru: "сгоревшая еда", en: "Burned Food", kz: "күйген тағам" },
    "Wrong Product": { ru: "неверный продукт", en: "Wrong Product", kz: "қате өнім" },
    "Missing Ingredients": { ru: "не хватает ингредиентов", en: "Missing Ingredients", kz: "ингредиент жетіспейді" }
  };
  return labels[product]?.[language] || product || "";
}

function buildAnalysisText(analysis, language = "ru") {
  const product = localizeProduct(analysis.detectedProduct, language);
  const quantity = Number(analysis.quantity || analysis.objectCount || 1);

  if (language === "en") {
    if (!product) {
      return "The image has been analyzed. Check the product and quantity before submitting.";
    }
    return `We found ${quantity} pcs of ${product}. It looks dropped or spoiled; please confirm before submitting.`;
  }

  if (language === "kz") {
    if (!product) {
      return "Сурет талданды. Жіберер алдында өнім мен санын тексеріңіз.";
    }
    return `Біз ${product} өнімін таптық: ${quantity} дана. Өнім құлаған немесе бұзылған сияқты, жіберер алдында растаңыз.`;
  }

  if (!product) {
    return "Фото проанализировано. Проверьте продукт и количество перед отправкой.";
  }
  return `Мы нашли: ${product}, ${quantity} шт. Похоже, продукт уронили или испортили; подтвердите перед отправкой.`;
}

function summarizeAnalytics(reports) {
  const submitted = reports.length;
  const approved = reports.filter((report) => report.status === "approved").length;
  const corrected = reports.filter((report) => report.correctionApplied).length;
  const falseDetections = reports.filter((report) => report.falseDetection).length;
  const confidences = reports
    .map((report) => Number(report.aiPrediction?.confidence || 0))
    .filter((confidence) => confidence > 0);
  const averageConfidence = confidences.length
    ? Math.round(confidences.reduce((total, value) => total + value, 0) / confidences.length)
    : 0;
  const productCorrections = {};
  const productLosses = {};

  reports.forEach((report) => {
    const product = report.finalEmployeeCorrection?.product || "Manual";
    productLosses[product] = (productLosses[product] || 0) + Number(report.cost || 0);
    if (report.correctionApplied) {
      productCorrections[product] = (productCorrections[product] || 0) + 1;
    }
  });

  return {
    submitted,
    pending: reports.filter((report) => report.status === "pending").length,
    approved,
    rejected: reports.filter((report) => report.status === "rejected").length,
    approvalRate: submitted ? Math.round((approved / submitted) * 100) : 0,
    averageConfidence,
    employeeCorrections: corrected,
    correctionRate: submitted ? Math.round((corrected / submitted) * 100) : 0,
    falseDetections,
    falseDetectionRate: submitted ? Math.round((falseDetections / submitted) * 100) : 0,
    productCorrections,
    productLosses,
    totalLoss: reports.reduce((total, report) => total + Number(report.cost || 0), 0),
    preventedLosses: reports
      .filter((report) => report.status === "approved")
      .reduce((total, report) => total + Math.round(Number(report.cost || 0) * 0.18), 0)
  };
}

function escapePdfText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "?")
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function periodLabel(period) {
  return {
    today: "Day",
    week: "Week",
    month: "Month",
    quarter: "Quarter",
    year: "Year",
    iiko: "iiko act"
  }[period] || "Report";
}

function buildPdf(lines) {
  const safeLines = lines.slice(0, 44).map((line) => escapePdfText(line));
  const textCommands = safeLines.map((line, index) => `BT /F1 11 Tf 54 ${760 - index * 16} Td (${line}) Tj ET`).join("\n");
  const stream = `${textCommands}\n`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, "utf8");
}

function buildReportPdf(period, reports, analytics) {
  const lines = [
    "Bahandisation write-off report",
    `Period: ${periodLabel(period)}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    `Total requests: ${analytics.submitted}`,
    `Pending: ${analytics.pending}`,
    `Approved: ${analytics.approved}`,
    `Rejected: ${analytics.rejected}`,
    `Approval rate: ${analytics.approvalRate}%`,
    `Average AI confidence: ${analytics.averageConfidence}%`,
    `Employee corrections: ${analytics.employeeCorrections}`,
    `False detections: ${analytics.falseDetections}`,
    `Total loss KZT: ${analytics.totalLoss}`,
    `Prevented loss KZT: ${analytics.preventedLosses}`,
    "",
    "Recent records:"
  ];

  reports.slice(0, 24).forEach((report, index) => {
    const final = report.finalEmployeeCorrection || {};
    lines.push(
      `${index + 1}. ${report.status} | ${final.product || "Manual"} | qty ${final.quantity || 1} | ${final.branchName || "Bahandi"} | AI ${report.aiPrediction?.confidence || 0}%`
    );
  });

  return buildPdf(lines);
}

async function handleStatic(request, response, pathname) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, requested));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendError(response, 403, "Forbidden.");
    return;
  }

  try {
    const content = await fsp.readFile(filePath);
    response.writeHead(200, {
      "Content-Type": CONTENT_TYPES[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(content);
  } catch {
    const fallback = await fsp.readFile(path.join(PUBLIC_DIR, "index.html"));
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(fallback);
  }
}

async function route(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/api/health") {
      sendJson(response, 200, {
        ok: true,
        roboflowConfigured: Boolean(process.env.ROBOFLOW_API_KEY),
        workflow: roboflow.getWorkflowMetadata()
      });
      return;
    }

    if (request.method === "GET" && pathname === "/api/stores") {
      sendJson(response, 200, await readJson(STORES_FILE, []));
      return;
    }

    if (request.method === "GET" && pathname === "/api/reports") {
      sendJson(response, 200, await readJson(REPORTS_FILE, []));
      return;
    }

    if (request.method === "GET" && pathname === "/api/analytics") {
      const reports = await readJson(REPORTS_FILE, []);
      sendJson(response, 200, summarizeAnalytics(reports));
      return;
    }

    if (request.method === "GET" && pathname === "/api/reports/pdf") {
      const period = url.searchParams.get("period") || "today";
      const reports = await readJson(REPORTS_FILE, []);
      const analytics = summarizeAnalytics(reports);
      const pdf = buildReportPdf(period, reports, analytics);
      response.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="bahandisation-${period}.pdf"`,
        "Cache-Control": "no-store"
      });
      response.end(pdf);
      return;
    }

    if (
      request.method === "POST" &&
      (pathname === "/api/roboflow/analyze" || pathname === "/api/bahandisation/analyze")
    ) {
      const body = await parseRequestBody(request);
      if (!body.image) {
        sendError(response, 400, "Image is required.");
        return;
      }

      const analysis = await roboflow.analyzeImage(body.image);
      analysis.summaryText = buildAnalysisText(analysis, body.language || "ru");
      const drafts = await readJson(DRAFTS_FILE, []);
      const draft = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        branchId: body.branchId || null,
        originalImage: body.image,
        aiPrediction: analysis
      };

      drafts.unshift(draft);
      await writeJson(DRAFTS_FILE, drafts.slice(0, 120));

      sendJson(response, 200, {
        ok: true,
        draftId: draft.id,
        ...sanitizePrediction(analysis)
      });
      return;
    }

    if (request.method === "POST" && pathname === "/api/reports") {
      const body = await parseRequestBody(request);
      const drafts = await readJson(DRAFTS_FILE, []);
      const draft = drafts.find((item) => item.id === body.draftId);
      const aiPrediction = draft?.aiPrediction || body.aiPrediction || {
        source: "manual",
        confidence: 0,
        detectedProduct: "",
        quantity: 0,
        lowConfidence: true
      };
      const finalEmployeeCorrection = {
        product: String(body.product || aiPrediction.detectedProduct || "Manual product"),
        quantity: Math.max(1, Number(body.quantity || aiPrediction.quantity || 1)),
        unit: body.unit || "pcs",
        reason: body.reason || "Other",
        deductionType: body.deductionType || "without_deduction",
        deductionEmployee: body.deductionEmployee || "",
        comment: String(body.comment || "Submitted from manual mode"),
        branchId: body.branchId || draft?.branchId || "",
        branchName: body.branchName || ""
      };
      const correctionApplied = isCorrected(aiPrediction, finalEmployeeCorrection);
      const lowConfidence = Number(aiPrediction.confidence || 0) < 70;
      const report = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: "pending",
        originalImage: draft?.originalImage || body.image || "",
        aiPrediction,
        finalEmployeeCorrection,
        correctionApplied,
        falseDetection: correctionApplied || lowConfidence,
        cost: calculateReportCost(finalEmployeeCorrection.product, finalEmployeeCorrection.quantity),
        managerDecisionAt: null,
        iikoSync: "pending_manager_approval"
      };

      const reports = await readJson(REPORTS_FILE, []);
      reports.unshift(report);
      await writeJson(REPORTS_FILE, reports);

      sendJson(response, 201, {
        ok: true,
        report: sanitizePrediction(report)
      });
      return;
    }

    const statusMatch = pathname.match(/^\/api\/reports\/([^/]+)\/status$/);
    if (request.method === "PATCH" && statusMatch) {
      const body = await parseRequestBody(request);
      const nextStatus = body.status;
      if (!["approved", "rejected"].includes(nextStatus)) {
        sendError(response, 400, "Unsupported status.");
        return;
      }

      const reports = await readJson(REPORTS_FILE, []);
      const report = reports.find((item) => item.id === statusMatch[1]);
      if (!report) {
        sendError(response, 404, "Report not found.");
        return;
      }

      report.status = nextStatus;
      report.managerDecisionAt = new Date().toISOString();
      report.iikoSync = nextStatus === "approved" ? "simulated_ready" : "not_required";
      await writeJson(REPORTS_FILE, reports);

      sendJson(response, 200, {
        ok: true,
        report: sanitizePrediction(report)
      });
      return;
    }

    if (pathname.startsWith("/api/")) {
      sendError(response, 404, "API route not found.");
      return;
    }

    await handleStatic(request, response, pathname);
  } catch (error) {
    sendError(response, 500, "Unexpected server error.", String(error.message || error));
  }
}

async function start() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  for (const [file, fallback] of [
    [REPORTS_FILE, []],
    [DRAFTS_FILE, []],
    [STORES_FILE, []]
  ]) {
    if (!fs.existsSync(file)) {
      await writeJson(file, fallback);
    }
  }

  http.createServer(route).listen(PORT, () => {
    console.log(`Bahandisation is running at http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
