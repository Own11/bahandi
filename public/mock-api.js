(function () {
  const nativeFetch = window.fetch.bind(window);
  const reportsKey = "bahandisation-demo-reports";
  const stores = [
    { id: "bahandi-shakhterov", name: "Bahandi Шахтеров · Караганда" },
    { id: "bahandi-center", name: "Bahandi Center" },
    { id: "bahandi-airport", name: "Bahandi Airport" }
  ];

  function readReports() {
    try {
      return JSON.parse(localStorage.getItem(reportsKey) || "[]");
    } catch {
      return [];
    }
  }

  function writeReports(reports) {
    localStorage.setItem(reportsKey, JSON.stringify(reports.slice(0, 100)));
  }

  function json(payload, status = 200) {
    return Promise.resolve(
      new Response(JSON.stringify(payload), {
        status,
        headers: { "content-type": "application/json; charset=utf-8" }
      })
    );
  }

  function analytics(reports) {
    const approved = reports.filter((report) => report.status === "approved").length;
    const corrected = reports.filter((report) => report.correctionApplied).length;
    const totalLoss = reports.reduce((total, report) => total + Number(report.cost || 0), 0);
    return {
      submitted: reports.length,
      pending: reports.filter((report) => report.status === "pending").length,
      approved,
      rejected: reports.filter((report) => report.status === "rejected").length,
      approvalRate: reports.length ? Math.round((approved / reports.length) * 100) : 0,
      averageConfidence: 0,
      employeeCorrections: corrected,
      correctionRate: reports.length ? Math.round((corrected / reports.length) * 100) : 0,
      falseDetections: corrected,
      falseDetectionRate: reports.length ? Math.round((corrected / reports.length) * 100) : 0,
      productCorrections: {},
      productLosses: reports.reduce((acc, report) => {
        const product = report.finalEmployeeCorrection?.product || "Manual";
        acc[product] = (acc[product] || 0) + Number(report.cost || 0);
        return acc;
      }, {}),
      totalLoss,
      preventedLosses: Math.round(totalLoss * 0.18)
    };
  }

  function makeId() {
    return window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now() + Math.random());
  }

  window.fetch = async function (input, options = {}) {
    const url = new URL(typeof input === "string" ? input : input.url, window.location.href);
    if (!url.pathname.startsWith("/api/")) return nativeFetch(input, options);

    const reports = readReports();

    if (url.pathname === "/api/health") {
      return json({
        ok: true,
        roboflowConfigured: false,
        workflow: {
          name: "food detrction",
          workspace: "aluas-workspace-qi0vz",
          workflowId: "find-french-friesm-onion-and-others-logic",
          imageInput: "image",
          timeoutMs: 12000,
          maxAttempts: 2
        }
      });
    }

    if (url.pathname === "/api/stores") return json(stores);
    if (url.pathname === "/api/reports") {
      if ((options.method || "GET").toUpperCase() === "GET") return json(reports);
      const body = JSON.parse(options.body || "{}");
      const quantity = Math.max(1, Number(body.quantity || 1));
      const product = body.product || "Manual product";
      const report = {
        id: makeId(),
        createdAt: new Date().toISOString(),
        status: "pending",
        originalImage: body.image || "",
        aiPrediction: body.aiPrediction || { source: "github_pages_demo", detectedProduct: "", confidence: 0 },
        finalEmployeeCorrection: {
          product,
          quantity,
          unit: body.unit || "pcs",
          reason: body.reason || "Other",
          branchId: body.branchId || stores[0].id,
          branchName: body.branchName || stores[0].name,
          comment: body.comment || "GitHub Pages demo"
        },
        correctionApplied: true,
        falseDetection: false,
        cost: quantity * 500,
        iikoSync: "demo"
      };
      reports.unshift(report);
      writeReports(reports);
      return json({ ok: true, report }, 201);
    }

    if (url.pathname === "/api/analytics") return json(analytics(reports));

    if (url.pathname === "/api/bahandisation/analyze" || url.pathname === "/api/roboflow/analyze") {
      return json({
        ok: true,
        draftId: makeId(),
        workflow: {
          name: "food detrction",
          workspace: "aluas-workspace-qi0vz",
          workflowId: "find-french-friesm-onion-and-others-logic"
        },
        source: "github_pages_demo",
        requiresApiKey: true,
        detectedProducts: [],
        detectedProduct: "",
        quantity: 0,
        confidence: 0,
        boundingBoxes: [],
        objectCount: 0,
        summaryText: "GitHub Pages demo: choose the product manually. Live Roboflow works in the Node backend build."
      });
    }

    const statusMatch = url.pathname.match(/^\/api\/reports\/([^/]+)\/status$/);
    if (statusMatch) {
      const body = JSON.parse(options.body || "{}");
      const report = reports.find((item) => item.id === statusMatch[1]);
      if (!report) return json({ ok: false, error: "Report not found." }, 404);
      report.status = body.status || report.status;
      report.managerDecisionAt = new Date().toISOString();
      writeReports(reports);
      return json({ ok: true, report });
    }

    return json({ ok: false, error: "Demo route not found." }, 404);
  };
})();
