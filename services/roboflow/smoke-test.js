const assert = require("node:assert/strict");
const zlib = require("node:zlib");
const { analyzeImage, getWorkflowMetadata, getWorkflowRequestShape } = require("./index");

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function createSmokeImageBase64() {
  const width = 192;
  const height = 128;
  const rows = [];

  for (let y = 0; y < height; y += 1) {
    const row = Buffer.alloc(1 + width * 3);
    row[0] = 0;
    for (let x = 0; x < width; x += 1) {
      let r = 246;
      let g = 238;
      let b = 218;
      const fry = x > 22 && x < 90 && ((x + y) % 24 < 8) && y > 22 && y < 96;
      const pattyA = ((x - 118) / 44) ** 2 + ((y - 58) / 28) ** 2 < 1;
      const pattyB = ((x - 142) / 34) ** 2 + ((y - 82) / 22) ** 2 < 1;
      if (fry) [r, g, b] = [216, 154, 42];
      if (pattyA || pattyB) [r, g, b] = [126, 67, 34];
      const offset = 1 + x * 3;
      row[offset] = r;
      row[offset + 1] = g;
      row[offset + 2] = b;
    }
    rows.push(row);
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  return Buffer.concat([
    Buffer.from("89504e470d0a1a0a", "hex"),
    pngChunk("IHDR", header),
    pngChunk("IDAT", zlib.deflateSync(Buffer.concat(rows))),
    pngChunk("IEND", Buffer.alloc(0))
  ]).toString("base64");
}

async function main() {
  const workflow = getWorkflowMetadata();

  const result = await analyzeImage(createSmokeImageBase64());
  const requestShape = getWorkflowRequestShape();

  assert.equal(result.workflow.workflowId, workflow.workflowId);
  assert.equal(result.workflow.workspace, workflow.workspace);
  assert.equal(requestShape.inputs.image, "image");
  assert.ok("detectedProducts" in result, "Parsed result should include detectedProducts.");
  assert.ok("confidence" in result, "Parsed result should include confidence.");
  assert.ok("objectCount" in result, "Parsed result should include objectCount.");

  if (process.env.ROBOFLOW_API_KEY) {
    assert.ok(Array.isArray(result.outputKeys), "Workflow output keys should be exposed.");
    assert.ok(result.outputKeys.length > 0, "Workflow output keys should not be empty.");
    assert.ok(Array.isArray(result.workflowArtifacts), "Parsed result should include workflowArtifacts.");
  } else {
    assert.equal(result.requiresApiKey, true, "Local fallback should tell the UI that Roboflow is not configured.");
    assert.equal(result.detectedProduct, "", "Local fallback must not invent a product.");
  }

  const mode = process.env.ROBOFLOW_API_KEY ? "live Roboflow" : "manual fallback";
  console.log(`${mode} smoke test passed for ${workflow.workflowId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
