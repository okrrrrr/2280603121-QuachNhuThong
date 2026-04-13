/**
 * Bài 12.2: Array Utilities
 * 
 * Module cung cấp các tiện ích xử lý Mảng
 * @module arrayUtils
 */

/**
 * Chia mảng thành các phần nhỏ
 * @param {any[]} array 
 * @param {number} size 
 * @returns {any[][]}
 */
function chunk(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

/**
 * Làm phẳng mảng lồng nhau
 * @param {any[]} array 
 * @param {number} [depth=1] 
 */
function flatten(array, depth = 1) {
    return array.flat(depth);
}

/**
 * Loại bỏ các phần tử trùng lặp
 * @param {any[]} array 
 */
function unique(array) {
    return [...new Set(array)];
}

/**
 * Láy phần giao của các mảng
 * @param {...any[][]} arrays 
 */
function intersection(...arrays) {
    if (arrays.length === 0) return [];
    return arrays.reduce((acc, curr) => acc.filter(x => curr.includes(x)));
}

/**
 * Lấy các phần tử có trong arr1 nhưng không có trong arr2
 */
function difference(arr1, arr2) {
    return arr1.filter(x => !arr2.includes(x));
}

/**
 * Xáo trộn mảng (Fisher-Yates)
 */
function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Nhóm mảng theo một key hoặc hàm
 */
function groupBy(array, keyOrFn) {
    return array.reduce((acc, item) => {
        const key = typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn];
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});
}

/**
 * Sắp xếp mảng theo key
 */
function sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

module.exports = {
    chunk,
    flatten,
    unique,
    intersection,
    difference,
    shuffle,
    groupBy,
    sortBy
};
