/** Wrapper để thực thi hàm một cách an toàn */
export const tryCatch = (fn) => {
    try {
        return [null, fn()];
    } catch (error) {
        return [error, null];
    }
};

/** Parse JSON không lo bị crash */
export const safeJsonParse = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch {
        return null;
    }
};

/** Wrap một Promise với giới hạn thời gian (Timeout) */
export const withTimeout = (promise, ms) => {
    let timeoutId;
    const timeout = new Promise((_, reject) =>
        timeoutId = setTimeout(() => reject(new Error("Timeout!")), ms)
    );
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
};

/** Thử lại hàm với cơ chế trì hoãn tăng dần (Exponential backoff - nâng cao) */
export const withRetry = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return withRetry(fn, retries - 1, delay * 2);
    }
};