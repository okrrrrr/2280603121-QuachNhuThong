/** Đợi ms milliseconds */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/** Mô phỏng lấy dữ liệu User */
export const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 0) reject('User không tồn tại');
            resolve({ id: userId, name: `User ${userId}` });
        }, 300);
    });
};

/** Lấy nhiều users cùng lúc */
export const fetchMultipleUsers = (userIds) => {
    return Promise.all(userIds.map(id => fetchUserData(id)));
};

/** Thử lại thao tác nếu thất bại */
export const retryOperation = async (operation, maxRetries) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError;
};