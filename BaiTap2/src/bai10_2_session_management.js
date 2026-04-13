import { StorageManager } from './bai10_1_localstorage_wrapper.js';

const SESSION_KEY = 'user_session';
const SESSION_DURATION = 3600000; // 1 giờ

export const createSession = (userData) => {
    StorageManager.set(SESSION_KEY, userData, SESSION_DURATION);
};

export const getSession = () => StorageManager.get(SESSION_KEY);

export const isSessionValid = () => getSession() !== null;

export const updateSession = (data) => {
    const current = getSession();
    if (current) {
        createSession({ ...current, ...data });
    }
};

export const destroySession = () => {
    StorageManager.remove(SESSION_KEY);
};