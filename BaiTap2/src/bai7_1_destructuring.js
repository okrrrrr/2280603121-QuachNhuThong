/** Trích xuất thông tin từ object lồng nhau */
export const extractUserInfo = (user) => {
    // Lấy name, email và thành phố từ object user
    const { name, email, address: { city } } = user;
    return `${name} lives in ${city}`;
};

/** Hoán đổi giá trị 2 biến không dùng biến tạm */
export const swapValues = (a, b) => {
    [a, b] = [b, a];
    return [a, b];
};

/** Lấy phần tử đầu và phần còn lại của mảng */
export const getFirstAndRest = (array) => {
    const [first, ...rest] = array;
    return { first, rest };
};

/** Gộp nhiều object thành một */
export const mergeObjects = (...objects) => {
    return Object.assign({}, ...objects);
};

/** Xóa một thuộc tính và trả về object mới (Immutably) */
export const removeProperty = (obj, prop) => {
    const { [prop]: deleted, ...rest } = obj;
    return rest;
};