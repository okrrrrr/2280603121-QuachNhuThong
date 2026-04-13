const EventEmitter = require('events');

/**
 * Bài 4.2: Task Queue
 * 
 * Một hàng đợi công việc sử dụng EventEmitter
 * @class TaskQueue
 * @extends EventEmitter
 */
class TaskQueue extends EventEmitter {
    constructor() {
        super();
        this.queue = [];
        this.isPaused = false;
        this.isProcessing = false;
    }

    /**
     * Thêm một task vào hàng đợi
     * @param {Function} task - Một hàm trả về Promise
     */
    addTask(task) {
        this.queue.push(task);
        this.emit('taskAdded', task);
        this.processQueue();
    }

    /**
     * Bắt đầu xử lý hàng đợi
     */
    async processQueue() {
        if (this.isProcessing || this.isPaused || this.queue.length === 0) {
            if (this.queue.length === 0 && !this.isProcessing) {
                this.emit('queueEmpty');
            }
            return;
        }

        this.isProcessing = true;
        const task = this.queue.shift();

        try {
            const result = await task();
            this.emit('taskCompleted', result);
        } catch (error) {
            this.emit('taskFailed', error);
        } finally {
            this.isProcessing = false;
            this.processQueue();
        }
    }

    /**
     * Tạm dừng xử lý hàng đợi
     */
    pause() {
        this.isPaused = true;
    }

    /**
     * Tiếp tục xử lý hàng đợi
     */
    resume() {
        this.isPaused = false;
        this.processQueue();
    }

    /**
     * Xóa toàn bộ task trong hàng đợi
     */
    clear() {
        this.queue = [];
    }
}

module.exports = TaskQueue;
