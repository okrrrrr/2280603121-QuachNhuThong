const path = require("path");
const { Readable } = require("stream");
const AppError = require("../utils/appError");
const workerPath = path.resolve(__dirname, "../workers/report.worker.js");

async function queueReportGeneration(report) {
  // TODO: Tao luong worker_threads day du:
  // - Tao worker voi workerPath
  // - cap nhat trang thai processing/completed/failed
  // - phat domain event report.status.changed
  void report;
  void workerPath;
}

function createCsvStream(report) {
  if (!report) {
    throw new AppError("Report is required", 400);
  }
  // TODO: Chi cho download khi report completed va stream du lieu that.
  return Readable.from(["TODO: Implement CSV export stream\n"], {
    encoding: "utf8",
  });
}

module.exports = {
  queueReportGeneration,
  createCsvStream,
};
