import { fetchUserData } from './bai4_2_promises.js';

/** Viết lại fetchUserData dùng async/await */
export const asyncFetchUser = async (userId) => {
    try {
        const user = await fetchUserData(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

/** Fetch URLs theo thứ tự (Sequential) */
export const sequentialFetch = async (urls) => {
    const results = [];
    for (const url of urls) {
        // Mỗi url phải đợi url trước xong mới chạy
        const res = await Promise.resolve(`Data from ${url}`);
        results.push(res);
    }
    return results;
};

/** Fetch URLs song song (Parallel) - Nhanh hơn nhiều */
export const parallelFetch = async (urls) => {
    const promises = urls.map(url => Promise.resolve(`Data from ${url}`));
    return await Promise.all(promises);
};