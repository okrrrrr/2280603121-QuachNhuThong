const os = require('os');
const { execSync } = require('child_process');

/**
 * Bài 5.2: System Info
 * 
 * Module lấy thông tin hệ thống sử dụng OS module
 * @module systemInfo
 */

/**
 * Lấy thông tin CPU
 * @returns {Object}
 */
function getCPUInfo() {
    return {
        model: os.cpus()[0].model,
        cores: os.cpus().length,
        speed: os.cpus()[0].speed,
        arch: os.arch()
    };
}

/**
 * Lấy thông tin bộ nhớ (bytes)
 * @returns {Object}
 */
function getMemoryInfo() {
    return {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem(),
        percentFree: (os.freemem() / os.totalmem() * 100).toFixed(2) + '%'
    };
}

/**
 * Lấy thông tin hệ điều hành
 * @returns {Object}
 */
function getOSInfo() {
    return {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        hostName: os.hostname(),
        endianness: os.endianness()
    };
}

/**
 * Lấy thông tin network interfaces
 * @returns {Object}
 */
function getNetworkInterfaces() {
    return os.networkInterfaces();
}

/**
 * Lấy thời gian máy tính đã hoạt động (giây)
 * @returns {number}
 */
function getUptime() {
    return os.uptime();
}

/**
 * Lấy thông tin người dùng hiện tại
 * @returns {Object}
 */
function getUserInfo() {
    return os.userInfo();
}

/**
 * Lấy thông tin Disk Usage (chỉ hỗ trợ Windows/Linux)
 * @returns {Promise<Object>}
 */
async function getDiskUsage() {
    try {
        if (process.platform === 'win32') {
            const output = execSync('wmic logicaldisk get size,freespace,caption').toString();
            return output;
        } else {
            const output = execSync('df -h /').toString();
            return output;
        }
    } catch (error) {
        return 'Disk usage info not available';
    }
}

module.exports = {
    getCPUInfo,
    getMemoryInfo,
    getOSInfo,
    getNetworkInterfaces,
    getUptime,
    getUserInfo,
    getDiskUsage
};
