/**
 * Lấy các phần tử duy nhất trong mảng
 */
export const unique = (arr) => [...new Set(arr)];

/**
 * Chia mảng thành các mảng con có kích thước size
 */
export const chunk = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

/**
 * Lấy phần tử ngẫu nhiên từ mảng
 */
export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];