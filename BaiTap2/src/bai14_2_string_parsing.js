/**
 * Chuyển đổi URL query string thành Object
 * @param {string} url 
 * @returns {Object}
 */
export const parseQueryString = (url) => {
    const queryString = url.split('?')[1];
    if (!queryString) return {};

    return queryString.split('&').reduce((acc, pair) => {
        const [key, value] = pair.split('=');
        if (key) {
            acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
        return acc;
    }, {});
};

/**
 * Tạo query string từ một Object
 * @param {Object} params 
 * @returns {string}
 */
export const buildQueryString = (params) => {
    const keys = Object.keys(params);
    if (keys.length === 0) return '';
    
    const parts = keys.map(key => 
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    return '?' + parts.join('&');
};

/**
 * Phân tích biểu thức toán học thành các tokens (số, toán tử, dấu ngoặc)
 * @param {string} expression 
 * @returns {string[]}
 */
export const tokenize = (expression) => {
    // Regex này bắt các số (kể cả số thập phân) hoặc các ký tự toán tử/ngoặc
    const regex = /\d+(\.\d+)?|[+\-*/()]|\s+/g;
    return (expression.match(regex) || [])
        .map(t => t.trim())
        .filter(t => t.length > 0);
};

/**
 * Simple Template Engine: Thay thế {{key}} bằng dữ liệu tương ứng
 * @param {string} template 
 * @param {Object} data 
 * @returns {string}
 */
export const parseTemplate = (template, data) => {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
        return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : match;
    });
};