/**
 * Bài 11.1: LinkedList
 * 
 * Cấu trúc dữ liệu danh sách liên kết đơn
 * @module linkedList
 */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    get size() {
        return this.length;
    }

    /**
     * Thêm vào cuối danh sách
     * @param {any} value
     */
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    /**
     * Thêm vào đầu danh sách
     * @param {any} value
     */
    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    /**
     * Chèn tại vị trí index
     * @param {number} index
     * @param {any} value
     */
    insert(index, value) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return this.prepend(value);
        if (index === this.length) return this.append(value);

        const newNode = new Node(value);
        let current = this.head;
        let prev = null;
        let i = 0;

        while (i < index) {
            prev = current;
            current = current.next;
            i++;
        }

        newNode.next = current;
        prev.next = newNode;
        this.length++;
        return true;
    }

    /**
     * Xóa node đầu tiên có giá trị value
     * @param {any} value
     * @returns {any|null}
     */
    remove(value) {
        if (!this.head) return null;

        if (this.head.value === value) {
            const val = this.head.value;
            this.head = this.head.next;
            this.length--;
            return val;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                const val = current.next.value;
                current.next = current.next.next;
                this.length--;
                return val;
            }
            current = current.next;
        }
        return null;
    }

    /**
     * Tìm node đầu tiên có giá trị value
     * @param {any} value
     * @returns {Node|null}
     */
    find(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) return current;
            current = current.next;
        }
        return null;
    }

    /**
     * Chuyển thành mảng
     * @returns {any[]}
     */
    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    /**
     * Đảo ngược danh sách
     */
    reverse() {
        let current = this.head;
        let prev = null;
        let next = null;

        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }
}

module.exports = LinkedList;
