/**
 * StorageManager: Quản lý LocalStorage với tính năng hết hạn
 */
export const StorageManager = {
    /**
     * Lưu dữ liệu
     * @param {string} key 
     * @param {any} value 
     * @param {number} expiresIn - Thời gian sống (miliseconds)
     */
    set(key, value, expiresIn = null) {
        const item = {
            value: value,
            expiry: expiresIn ? Date.now() + expiresIn : null
        };
        localStorage.setItem(key, JSON.stringify(item));
    },

    /** Lấy dữ liệu và kiểm tra hết hạn */
    get(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        const item = JSON.parse(itemStr);
        if (item.expiry && Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },

    getAll() {
        const all = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            all[key] = this.get(key);
        }
        return all;
    }
};