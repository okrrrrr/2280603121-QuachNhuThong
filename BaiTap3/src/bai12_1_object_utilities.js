/**
 * Bài 12.1: Object Utilities
 * 
 * Module cung cấp các tiện ích xử lý Object
 * @module objectUtils
 */

/**
 * Deep clone an object
 * @param {Object} obj
 * @returns {Object}
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(deepClone);

    const clone = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}

/**
 * Deep merge multiple objects
 * @param {...Object} objects
 * @returns {Object}
 */
function deepMerge(...objects) {
    const result = {};
    for (const obj of objects) {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                result[key] = deepMerge(result[key] || {}, obj[key]);
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

/**
 * Get nested value
 * @param {Object} obj 
 * @param {string} path 
 * @param {any} defaultValue 
 */
function get(obj, path, defaultValue) {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
        if (result && Object.prototype.hasOwnProperty.call(result, key)) {
            result = result[key];
        } else {
            return defaultValue;
        }
    }
    return result === undefined ? defaultValue : result;
}

/**
 * Set nested value
 */
function set(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) current[key] = {};
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
    return obj;
}

function pick(obj, keys) {
    const result = {};
    keys.forEach(key => {
        if (key in obj) result[key] = obj[key];
    });
    return result;
}

function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}

function flatten(obj, prefix = '') {
    let result = {};
    for (const key in obj) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            result = { ...result, ...flatten(obj[key], newKey) };
        } else {
            result[newKey] = obj[key];
        }
    }
    return result;
}

function unflatten(obj) {
    const result = {};
    for (const key in obj) {
        set(result, key, obj[key]);
    }
    return result;
}

module.exports = {
    deepClone,
    deepMerge,
    get,
    set,
    pick,
    omit,
    flatten,
    unflatten
};
