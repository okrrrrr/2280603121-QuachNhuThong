/**
 * Bài 6.1: Process Manager
 * 
 * Module quản lý và lấy thông tin process hiện tại
 * @module processManager
 */

/**
 * Lấy thông tin về process hiện tại
 * @returns {Object}
 */
function getProcessInfo() {
    return {
        pid: process.pid,
        ppid: process.ppid,
        platform: process.platform,
        version: process.version,
        uptime: process.uptime(),
        cwd: process.cwd(),
        argv: process.argv,
        execPath: process.execPath
    };
}

/**
 * Lấy thông tin sử dụng bộ nhớ của process
 * @returns {Object}
 */
function getMemoryUsage() {
    const usage = process.memoryUsage();
    return {
        rss: (usage.rss / 1024 / 1024).toFixed(2) + ' MB',
        heapTotal: (usage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
        heapUsed: (usage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
        external: (usage.external / 1024 / 1024).toFixed(2) + ' MB'
    };
}

/**
 * Lấy thông tin sử dụng CPU của process
 * @returns {Object}
 */
function getCPUUsage() {
    return process.cpuUsage();
}

/**
 * Lấy biến môi trường
 * @param {string} key - Tên biến
 * @returns {string}
 */
function getEnvVariable(key) {
    return process.env[key];
}

/**
 * Thiết lập biến môi trường
 * @param {string} key - Tên biến
 * @param {string} value - Giá trị
 */
function setEnvVariable(key, value) {
    process.env[key] = value;
}

/**
 * Đăng ký hàm xử lý khi process thoát
 * @param {Function} callback - Hàm xử lý
 */
function onExit(callback) {
    process.on('exit', callback);
}

/**
 * Đăng ký hàm xử lý khi có lỗi chưa được bắt
 * @param {Function} callback - Hàm xử lý
 */
function onUncaughtException(callback) {
    process.on('uncaughtException', callback);
}

module.exports = {
    getProcessInfo,
    getMemoryUsage,
    getCPUUsage,
    getEnvVariable,
    setEnvVariable,
    onExit,
    onUncaughtException
};
