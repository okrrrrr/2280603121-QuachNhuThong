/**
 * Module tiện ích xử lý chuỗi.
 */

/**
 * Chuyển chuỗi thành slug URL-friendly (Ví dụ: "Học Nodejs" -> "hoc-nodejs")
 * @param {string} str 
 * @returns {string}
 */
const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .normalize('NFD') // Khử dấu tiếng Việt
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

module.exports = {
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    reverse: (str) => str.split('').reverse().join(''),
    countWords: (str) => str.trim() === '' ? 0 : str.trim().split(/\s+/).length,
    isPalindrome: (str) => {
        const clean = str.toLowerCase().replace(/[\W_]/g, '');
        return clean === clean.split('').reverse().join('');
    },
    truncate: (str, max) => str.length > max ? str.slice(0, max) + '...' : str,
    slugify,
    camelCase: (str) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
    snakeCase: (str) => str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                        .map(x => x.toLowerCase()).join('_')
};