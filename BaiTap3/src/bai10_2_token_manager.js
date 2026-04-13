const crypto = require('crypto');

/**
 * Bài 10.2: Token Manager
 * 
 * Module quản lý tokens (JWT-like) mà không dùng thư viện ngoài
 * @module tokenManager
 */

function base64UrlEncode(str) {
    return Buffer.from(str)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return Buffer.from(str, 'base64').toString();
}

/**
 * Tạo token JWT-like
 * @param {Object} payload - Dữ liệu
 * @param {string} secret - Khóa bí mật
 * @param {Object} [options] - { expiresIn: 3600 }
 * @returns {string} Token string
 */
function generateToken(payload, secret, options = { expiresIn: 3600 }) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const fullPayload = {
        ...payload,
        iat: now,
        exp: now + options.expiresIn
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

    const signature = crypto
        .createHmac('sha256', secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Xác thực token
 * @param {string} token - Token cần kiểm tra
 * @param {string} secret - Khóa bí mật
 * @returns {Object|null} Payload nếu hợp lệ, nếu không trả về null
 */
function verifyToken(token, secret) {
    try {
        const [headerB64, payloadB64, signature] = token.split('.');

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${headerB64}.${payloadB64}`)
            .digest('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        if (signature !== expectedSignature) return null;

        const payload = JSON.parse(base64UrlDecode(payloadB64));

        if (payload.exp && Date.now() / 1000 > payload.exp) return null;

        return payload;
    } catch {
        return null;
    }
}

/**
 * Giải mã token không cần xác thực
 * @param {string} token
 * @returns {Object|null}
 */
function decodeToken(token) {
    try {
        const payloadB64 = token.split('.')[1];
        return JSON.parse(base64UrlDecode(payloadB64));
    } catch {
        return null;
    }
}

/**
 * Kiểm tra token đã hết hạn chưa
 * @param {string} token
 * @returns {boolean}
 */
function isExpired(token) {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return true;
    return Date.now() / 1000 > payload.exp;
}

module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
    isExpired
};
