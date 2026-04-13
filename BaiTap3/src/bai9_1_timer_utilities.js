/**
 * Bài 9.1: Timer Utilities
 * 
 * Module cung cấp các tiện ích điều khiển thời gian và thực thi hàm
 * @module timerUtilities
 */

/**
 * Delay trong một khoảng thời gian
 * @param {number} ms - Miliseconds
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Thêm timeout cho một Promise
 * @param {Promise} promise - Promise cần giới hạn thời gian
 * @param {number} ms - Thời gian chờ tối đa
 * @returns {Promise}
 */
function timeout(promise, ms) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), ms);
    });
    return Promise.race([promise, timeoutPromise]);
}

/**
 * Debounce function: chỉ thực thi sau một khoảng thời gian không có cuộc gọi mới
 * @param {Function} fn - Hàm cần thực thi
 * @param {number} wait - Thời gian chờ
 * @returns {Function}
 */
function debounce(fn, wait) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
    };
}

/**
 * Throttle function: giới hạn số lần thực thi trong một khoảng thời gian
 * @param {Function} fn - Hàm cần thực thi
 * @param {number} limit - Khoảng thời gian giới hạn
 * @returns {Function}
 */
function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Thử lại một hàm nếu thất bại với exponential backoff
 * @param {Function} fn - Hàm trả về Promise
 * @param {Object} options - { retries: 3, delay: 1000 }
 */
async function retry(fn, options = { retries: 3, delay: 1000 }) {
    let lastError;
    for (let i = 0; i < options.retries; i++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            const wait = options.delay * Math.pow(2, i);
            await delay(wait);
        }
    }
    throw lastError;
}

/**
 * Polling một hàm cho đến khi thỏa mãn điều kiện
 * @param {Function} fn - Hàm lấy dữ liệu
 * @param {number} interval - Tần suất polling
 * @param {Function} condition - Hàm kiểm tra điều kiện kết thúc
 */
async function poll(fn, interval, condition) {
    while (true) {
        const result = await fn();
        if (condition(result)) return result;
        await delay(interval);
    }
}

module.exports = {
    delay,
    timeout,
    debounce,
    throttle,
    retry,
    poll
};
