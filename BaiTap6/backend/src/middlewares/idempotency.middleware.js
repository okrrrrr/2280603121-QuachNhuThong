const crypto = require("crypto");
const IdempotencyKey = require("../models/idempotency.model");
const AppError = require("../utils/appError");

async function enforceIdempotency(req, res, next) {
  try {
    const key = req.header("Idempotency-Key");
    if (!key) {
      return next(new AppError("Idempotency-Key header is required", 400));
    }
    const requestHash = crypto.createHash("sha256").update(JSON.stringify(req.body || {})).digest("hex");

    const existingIdempotency = await IdempotencyKey.findOne({ key });
    if (existingIdempotency) {
      if (existingIdempotency.requestHash === requestHash) {
        return res.status(existingIdempotency.statusCode).json(existingIdempotency.responseBody);
      } else {
        return next(new AppError("Idempotency key used with different payload", 409));
      }
    }

    req.idempotency = { key, requestHash };
    return next();
  } catch (error) {
    return next(error);
  }
}

async function saveIdempotencyResponse(req, statusCode, body) {
  if (!req.idempotency || !req.idempotency.key) return;

  try {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    await IdempotencyKey.create({
      key: req.idempotency.key,
      method: req.method,
      path: req.originalUrl || req.path,
      requestHash: req.idempotency.requestHash,
      statusCode,
      responseBody: body,
      expiresAt,
    });
  } catch (error) {
    if (error.code !== 11000) {
      console.error("Save idempotency err:", error);
    }
  }
}

module.exports = {
  enforceIdempotency,
  saveIdempotencyResponse,
};
