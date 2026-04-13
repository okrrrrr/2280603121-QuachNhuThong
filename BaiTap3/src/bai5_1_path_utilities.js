const path = require('path');

/**
 * Bài 5.1: Path Utilities
 * 
 * Module tiện ích xử lý đường dẫn
 * @module pathUtils
 */

/**
 * Chuẩn hóa đường dẫn
 * @param {string} p - Đường dẫn cần chuẩn hóa
 * @returns {string}
 */
function normalizePath(p) {
    return path.normalize(p);
}

/**
 * Nối các đường dẫn lại với nhau
 * @param {...string} paths - Danh sách các phần của đường dẫn
 * @returns {string}
 */
function joinPaths(...paths) {
    return path.join(...paths);
}

/**
 * Resolve thành đường dẫn tuyệt đối
 * @param {...string} paths - Danh sách các phần của đường dẫn
 * @returns {string}
 */
function resolvePath(...paths) {
    return path.resolve(...paths);
}

/**
 * Lấy phần mở rộng của tệp
 * @param {string} filePath - Đường dẫn tệp
 * @returns {string}
 */
function getExtension(filePath) {
    return path.extname(filePath);
}

/**
 * Lấy tên tệp (bao gồm cả extension)
 * @param {string} filePath - Đường dẫn tệp
 * @returns {string}
 */
function getBasename(filePath) {
    return path.basename(filePath);
}

/**
 * Lấy tên thư mục cha
 * @param {string} filePath - Đường dẫn tệp
 * @returns {string}
 */
function getDirname(filePath) {
    return path.dirname(filePath);
}

/**
 * Kiểm tra đường dẫn có phải tuyệt đối không
 * @param {string} p - Đường dẫn
 * @returns {boolean}
 */
function isAbsolute(p) {
    return path.isAbsolute(p);
}

/**
 * Tính đường dẫn tương đối từ 'from' đến 'to'
 * @param {string} from - Điểm bắt đầu
 * @param {string} to - Điểm đến
 * @returns {string}
 */
function relativePath(from, to) {
    return path.relative(from, to);
}

module.exports = {
    normalizePath,
    joinPaths,
    resolvePath,
    getExtension,
    getBasename,
    getDirname,
    isAbsolute,
    relativePath
};
