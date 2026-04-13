const path = require("path");
const { Readable } = require("stream");
const { Worker } = require("worker_threads");
const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const Report = require("../models/report.model");
const { domainEvents, DOMAIN_EVENTS } = require("../events/domainEvents");
const workerPath = path.resolve(__dirname, "../workers/report.worker.js");

async function queueReportGeneration(report) {
  if (!report?._id) {
    throw new AppError("Report is required", 400);
  }

  const reportId = String(report._id);

  await Report.updateOne(
    { _id: reportId },
    { status: "processing", errorMessage: null }
  );
  domainEvents.emit(DOMAIN_EVENTS.REPORT_STATUS_CHANGED, {
    reportId,
    status: "processing",
  });

  const worker = new Worker(workerPath, {
    workerData: {
      reportId,
      fromDate: report.fromDate,
      toDate: report.toDate,
    },
  });

  worker.on("message", async (message) => {
    if (mongoose.connection.readyState === 0) {
      return;
    }
    try {
      if (message?.error) {
        await Report.updateOne(
          { _id: reportId },
          { status: "failed", errorMessage: message.error }
        );
        domainEvents.emit(DOMAIN_EVENTS.REPORT_STATUS_CHANGED, {
          reportId,
          status: "failed",
          errorMessage: message.error,
        });
        return;
      }

      await Report.updateOne(
        { _id: reportId },
        {
          status: "completed",
          totalEntries: message.totalEntries || 0,
          totalInspections: message.totalInspections || 0,
          workerDurationMs: message.workerDurationMs || 0,
          errorMessage: null,
        }
      );
      domainEvents.emit(DOMAIN_EVENTS.REPORT_STATUS_CHANGED, {
        reportId,
        status: "completed",
        totalEntries: message.totalEntries || 0,
        totalInspections: message.totalInspections || 0,
      });
    } catch (error) {
      // Avoid failing app/test flow if DB is closing.
    }
  });

  worker.on("error", async (err) => {
    if (mongoose.connection.readyState === 0) {
      return;
    }
    await Report.updateOne(
      { _id: reportId },
      { status: "failed", errorMessage: err.message || "Worker failed" }
    );
    domainEvents.emit(DOMAIN_EVENTS.REPORT_STATUS_CHANGED, {
      reportId,
      status: "failed",
      errorMessage: err.message || "Worker failed",
    });
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      // eslint-disable-next-line no-console
      console.warn(`Report worker exited with code ${code}`);
    }
  });
}

function createCsvStream(report) {
  if (!report) {
    throw new AppError("Report is required", 400);
  }

  const header = [
    "reportId",
    "title",
    "type",
    "fromDate",
    "toDate",
    "status",
    "totalEntries",
    "totalInspections",
    "workerDurationMs",
  ].join(",");

  const row = [
    String(report._id),
    JSON.stringify(report.title || ""),
    report.type || "",
    new Date(report.fromDate).toISOString(),
    new Date(report.toDate).toISOString(),
    report.status || "",
    String(report.totalEntries || 0),
    String(report.totalInspections || 0),
    String(report.workerDurationMs || 0),
  ].join(",");

  return Readable.from([`${header}\n${row}\n`], { encoding: "utf8" });
}

module.exports = {
  queueReportGeneration,
  createCsvStream,
};
