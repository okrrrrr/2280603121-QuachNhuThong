const path = require("path");
const { Readable } = require("stream");
const { Worker } = require("worker_threads");
const Report = require("../models/report.model");
const AppError = require("../utils/appError");
const { domainEvents, DOMAIN_EVENTS } = require("../events/domainEvents");
const workerPath = path.resolve(__dirname, "../workers/report.worker.js");

async function queueReportGeneration(report) {
  report.status = "processing";
  await report.save();
  domainEvents.emit(DOMAIN_EVENTS.REPORT_STATUS_CHANGED, { reportId: String(report._id), status: "processing" });

  const worker = new Worker(workerPath, {
    workerData: { fromDate: report.fromDate, toDate: report.toDate },
  });

  worker.on("message", async (msg) => {
    if (msg.error) {
      report.status = "failed";
      report.errorMessage = msg.error;
    } else {
      report.status = "completed";
      report.metrics = {
        totalEntries: msg.totalEntries,
        totalInspections: msg.totalInspections,
        processingTimeMs: msg.workerDurationMs,
      };
    }
    await report.save();
    domainEvents.emit(DOMAIN_EVENTS.REPORT_STATUS_CHANGED, { reportId: String(report._id), status: report.status });
  });

  worker.on("error", async (error) => {
    report.status = "failed";
    report.errorMessage = error.message;
    await report.save();
    domainEvents.emit(DOMAIN_EVENTS.REPORT_STATUS_CHANGED, { reportId: String(report._id), status: report.status });
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
}

function createCsvStream(report) {
  if (!report) {
    throw new AppError("Report is required", 400);
  }
  
  if (report.status !== "completed") {
    throw new AppError("Report not ready", 409);
  }

  const header = "id,title,fromDate,toDate,totalEntries,totalInspections,processingTimeMs\n";
  const metrics = report.metrics || {};
  const row = `${report._id},${report.title},${report.fromDate},${report.toDate},${metrics.totalEntries || 0},${metrics.totalInspections || 0},${metrics.processingTimeMs || 0}\n`;

  return Readable.from([header, row], {
    encoding: "utf8",
  });
}

module.exports = {
  queueReportGeneration,
  createCsvStream,
};
