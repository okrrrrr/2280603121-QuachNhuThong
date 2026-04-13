const AppError = require("../utils/appError");
const crypto = require("crypto");
const IdempotencyKey = require("../models/idempotency.model");

function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((v) => stableStringify(v)).join(",")}]`;
  }

  const keys = Object.keys(value).sort();
  return `{${keys
    .map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`)
    .join(",")}}`;
}

function createRequestHash({ method, path, body }) {
  const payload = `${method.toUpperCase()}|${path}|${stableStringify(body || {})}`;
  return crypto.createHash("sha256").update(payload).digest("hex");
}

async function enforceIdempotency(req, res, next) {
  try {
    const key = req.header("Idempotency-Key");
    if (!key) {
      return next(new AppError("Idempotency-Key header is required", 400));
    }

    const method = req.method.toUpperCase();
    const path = req.baseUrl + req.path;
    const requestHash = createRequestHash({ method, path, body: req.body });
    const now = new Date();

    const existing = await IdempotencyKey.findOne({
      key,
      expiresAt: { $gt: now },
    });

    if (existing) {
      if (existing.method !== method || existing.path !== path) {
        return next(new AppError("Idempotency-Key conflict for different route", 409));
      }

      if (existing.requestHash !== requestHash) {
        return next(new AppError("Idempotency-Key conflict: payload mismatch", 409));
      }

      return res.status(existing.statusCode).json(existing.responseBody);
    }

    req.idempotency = {
      key,
      method,
      path,
      requestHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour TTL
    };
    return next();
  } catch (error) {
    return next(error);
  }
}

async function saveIdempotencyResponse(req, statusCode, body) {
  const ctx = req?.idempotency;
  if (!ctx?.key) return;

  try {
    await IdempotencyKey.findOneAndUpdate(
      { key: ctx.key },
      {
        key: ctx.key,
        method: ctx.method,
        path: ctx.path,
        requestHash: ctx.requestHash,
        statusCode,
        responseBody: body,
        expiresAt: ctx.expiresAt,
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );
  } catch (error) {
    // Ignore duplicate/race errors; idempotency is best-effort for this course scaffold.
    if (error?.code !== 11000) {
      throw error;
    }
  }
}

module.exports = {
  enforceIdempotency,
  saveIdempotencyResponse,
};
