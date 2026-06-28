# Bahandisation Roboflow Integration

This prototype keeps the Roboflow API key on the backend only.

## Run

```powershell
$env:ROBOFLOW_API_KEY="your_key_here"
npm start
```

If `ROBOFLOW_API_KEY` is empty, the backend switches to manual fallback and does not invent a product. A real Roboflow call is made only from `services/roboflow`.

Never place the key in source code, frontend files, screenshots, or checked-in docs. Set it only as an environment variable. If a key was pasted into chat or a ticket, rotate it in Roboflow after testing.

The frontend uploads photos to `/api/bahandisation/analyze`. That API calls Roboflow on the server, parses detections, and returns a human-readable result text plus confidence, quantity, object count, and bounding boxes.

## Roboflow Workflow

- API URL: `https://serverless.roboflow.com`
- Workspace: `aluas-workspace-qi0vz`
- Workflow ID: `find-french-friesm-onion-and-others-logic`
- Workflow name: `food detrction`
- Declared image input: `image`
- Run endpoint: `https://serverless.roboflow.com/aluas-workspace-qi0vz/workflows/find-french-friesm-onion-and-others-logic`
- Model version: `v3`
- Timeout: 12 seconds by default for hosted workflow stability
- Attempts: 2 total attempts with a short backoff

Optional workflow parameters can be supplied as JSON:

```powershell
$env:ROBOFLOW_PARAMETERS_JSON='{"some_parameter":"value"}'
```

Only use parameter names and types declared by the Roboflow workflow.

## Response Handling

Roboflow workflow responses are parsed defensively from their returned output keys. The parser searches for prediction arrays, summary objects, and text summaries without assuming a single output name.

If a workflow output contains an image-shaped base64 value, the backend writes it to `data/roboflow-outputs` and stores only a small artifact reference in analytics/report data. Do not log raw Roboflow image outputs.

## Data Stored

Each submitted report stores:

- original image
- AI prediction
- final employee correction
- confidence and correction analytics

## Smoke Test

```powershell
$env:ROBOFLOW_API_KEY="your_key_here"
npm run test:roboflow
```

If `npm` is unavailable in the current shell, run the test directly:

```powershell
node services/roboflow/smoke-test.js
```

The smoke test calls the backend Roboflow service with a generated sample image. Without `ROBOFLOW_API_KEY`, it verifies that manual fallback does not invent a product. With `ROBOFLOW_API_KEY`, it performs a live hosted workflow call.
