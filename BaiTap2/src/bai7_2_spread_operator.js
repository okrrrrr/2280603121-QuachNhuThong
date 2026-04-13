/** Deep clone object (phiên bản đơn giản dùng JSON) */
export const cloneDeep = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/** Gộp các mảng và loại bỏ phần tử trùng */
export const mergeArraysUnique = (...arrays) => {
    return [...new Set(arrays.flat())];
};

/** Cập nhật thuộc tính lồng nhau mà không sửa object cũ */
export const updateNestedObject = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const deepClone = JSON.parse(JSON.stringify(obj));
    
    let current = deepClone;
    keys.forEach(key => {
        if (!current[key]) current[key] = {};
        current = current[key];
    });
    
    current[lastKey] = value;
    return deepClone;
};

/** Các thao tác mảng Immutably (không dùng push/pop gốc) */
export const arrayOperations = {
    push: (arr, item) => [...arr, item],
    pop: (arr) => arr.slice(0, -1),
    shift: (arr) => arr.slice(1),
    unshift: (arr, item) => [item, ...arr]
};