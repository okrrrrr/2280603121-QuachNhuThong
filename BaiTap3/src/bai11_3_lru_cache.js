/**
 * Bài 11.3: LRU Cache
 * 
 * Bộ nhớ đệm Least Recently Used
 * @module lruCache
 */

class LRUCache {
    /**
     * @param {number} capacity - Số lượng tối đa phần tử
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get size() {
        return this.cache.size;
    }

    /**
     * Lấy giá trị từ cache và làm mới vị trí sử dụng
     * @param {any} key
     * @returns {any}
     */
    get(key) {
        if (!this.cache.has(key)) return undefined;

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    /**
     * Lưu giá trị vào cache
     * @param {any} key
     * @param {any} value
     */
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    /**
     * Xóa một key
     * @param {any} key
     */
    delete(key) {
        return this.cache.delete(key);
    }

    /**
     * Xóa toàn bộ cache
     */
    clear() {
        this.cache.clear();
    }

    /**
     * Lấy danh sách keys theo thứ tự sử dụng (cũ nhất -> mới nhất)
     * @returns {any[]}
     */
    keys() {
        return Array.from(this.cache.keys());
    }
}

module.exports = LRUCache;
