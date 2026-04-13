const http = require('./bai7_1_http_client');

/**
 * Bài 7.2: API Wrapper
 * 
 * Wrapper cho JSONPlaceholder API sử dụng HttpClient tự tạo
 * @module apiWrapper
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Lấy danh sách tất cả người dùng
 * @returns {Promise<Object[]>}
 */
async function getUsers() {
    const res = await http.get(`${BASE_URL}/users`);
    return res.data;
}

/**
 * Lấy thông tin người dùng theo ID
 * @param {number|string} id - User ID
 * @returns {Promise<Object>}
 */
async function getUserById(id) {
    const res = await http.get(`${BASE_URL}/users/${id}`);
    return res.data;
}

/**
 * Lấy danh sách bài viết của một người dùng
 * @param {number|string} userId - User ID
 * @returns {Promise<Object[]>}
 */
async function getUserPosts(userId) {
    const res = await http.get(`${BASE_URL}/posts?userId=${userId}`);
    return res.data;
}

/**
 * Tạo một bài viết mới
 * @param {Object} postData - Dữ liệu bài viết
 * @returns {Promise<Object>}
 */
async function createPost(postData) {
    const res = await http.post(`${BASE_URL}/posts`, postData);
    return res.data;
}

/**
 * Cập nhật bài viết
 * @param {number|string} id - Post ID
 * @param {Object} data - Dữ liệu cập nhật
 * @returns {Promise<Object>}
 */
async function updatePost(id, data) {
    const res = await http.put(`${BASE_URL}/posts/${id}`, data);
    return res.data;
}

/**
 * Xóa một bài viết
 * @param {number|string} id - Post ID
 * @returns {Promise<boolean>}
 */
async function deletePost(id) {
    const res = await http.delete(`${BASE_URL}/posts/${id}`);
    return res.statusCode === 200;
}

/**
 * Tìm kiếm bài viết theo query (sử dụng query parameter title)
 * @param {string} query - Nội dung tìm kiếm
 * @returns {Promise<Object[]>}
 */
async function searchPosts(query) {
    const res = await http.get(`${BASE_URL}/posts?q=${encodeURIComponent(query)}`);
    return res.data;
}

module.exports = {
    getUsers,
    getUserById,
    getUserPosts,
    createPost,
    updatePost,
    deletePost,
    searchPosts
};
