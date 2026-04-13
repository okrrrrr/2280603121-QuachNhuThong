import { HttpClient } from './bai9_1_fetch_wrapper.js';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getAllUsers = () => HttpClient.get(`${BASE_URL}/users`);

export const getUserById = (id) => HttpClient.get(`${BASE_URL}/users/${id}`);

export const getUserPosts = (userId) => HttpClient.get(`${BASE_URL}/posts?userId=${userId}`);

export const createUser = (userData) => HttpClient.post(`${BASE_URL}/users`, userData);