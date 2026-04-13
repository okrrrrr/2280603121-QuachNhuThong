const crypto = require('crypto');

/**
 * Bài 10.1: Crypto Utilities
 * 
 * Module cung cấp các tiện ích mã hóa và bảo mật
 * @module cryptoUtils
 */

/**
 * Hash dữ liệu sử dụng thuật toán
 * @param {string} data - Dữ liệu
 * @param {string} [algorithm='sha256'] - md5, sha256, sha512
 * @returns {string} Hex string
 */
function hash(data, algorithm = 'sha256') {
    return crypto.createHash(algorithm).update(data).digest('hex');
}

/**
 * Hash password với salt (sử dụng pbkdf2)
 * @param {string} password - Mật khẩu
 * @returns {string} Chuỗi format: salt:hash
 */
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Kiểm tra password
 * @param {string} password - Mật khẩu cần kiểm tra
 * @param {string} storedHash - Chuỗi hash lưu trữ (salt:hash)
 * @returns {boolean}
 */
function verifyPassword(password, storedHash) {
    const [salt, hash] = storedHash.split(':');
    const derivedKey = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    return hash === derivedKey.toString('hex');
}

/**
 * Mã hóa dữ liệu (AES-256-CBC)
 * @param {string} data - Dữ liệu cần mã hóa
 * @param {string} key - Khóa bí mật (32 bytes)
 * @returns {string} format: iv:encrypted
 */
function encrypt(data, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Giải mã dữ liệu
 * @param {string} encryptedData - Chuỗi format iv:encrypted
 * @param {string} key - Khóa bí mật
 * @returns {string}
 */
function decrypt(encryptedData, key) {
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/**
 * Tạo byte ngẫu nhiên
 * @param {number} size - Kích thước
 * @returns {Buffer}
 */
function generateRandomBytes(size) {
    return crypto.randomBytes(size);
}

/**
 * Tạo UUID v4
 * @returns {string}
 */
function generateUUID() {
    return crypto.randomUUID();
}

module.exports = {
    hash,
    hashPassword,
    verifyPassword,
    encrypt,
    decrypt,
    generateRandomBytes,
    generateUUID
};
