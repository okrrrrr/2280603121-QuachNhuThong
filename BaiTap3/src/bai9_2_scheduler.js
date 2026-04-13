/**
 * Bài 9.2: Task Scheduler
 * 
 * Lập lịch thực thi các công việc trong tương lai hoặc định kỳ
 * @module scheduler
 */

class Scheduler {
    constructor() {
        this.tasks = new Map();
        this.nextId = 1;
    }

    /**
     * Chạy một task tại một thời điểm cụ thể
     * @param {Function} task - Hàm thực thi
     * @param {Date|number} time - Thời điểm thực thi
     * @returns {number} taskId
     */
    schedule(task, time) {
        const delay = time instanceof Date ? time.getTime() - Date.now() : time;
        const id = this.nextId++;

        const timer = setTimeout(() => {
            task();
            this.tasks.delete(id);
        }, delay);

        this.tasks.set(id, { type: 'once', timer, task, status: 'scheduled' });
        return id;
    }

    /**
     * Chạy một task định kỳ
     * @param {Function} task - Hàm thực thi
     * @param {number} interval - Khoảng cách (ms)
     * @returns {number} taskId
     */
    scheduleInterval(task, interval) {
        const id = this.nextId++;
        const timer = setInterval(task, interval);
        this.tasks.set(id, { type: 'interval', timer, task, interval, status: 'running' });
        return id;
    }

    /**
     * Hủy một task đã lập lịch
     * @param {number} taskId
     */
    cancel(taskId) {
        const info = this.tasks.get(taskId);
        if (!info) return;

        if (info.type === 'once') clearTimeout(info.timer);
        else clearInterval(info.timer);

        this.tasks.delete(taskId);
    }

    /**
     * Tạm dừng task định kỳ
     * @param {number} taskId
     */
    pause(taskId) {
        const info = this.tasks.get(taskId);
        if (!info || info.type !== 'interval' || info.status === 'paused') return;

        clearInterval(info.timer);
        info.status = 'paused';
    }

    /**
     * Tiếp tục task định kỳ
     * @param {number} taskId
     */
    resume(taskId) {
        const info = this.tasks.get(taskId);
        if (!info || info.type !== 'interval' || info.status !== 'paused') return;

        info.timer = setInterval(info.task, info.interval);
        info.status = 'running';
    }

    getScheduledTasks() {
        return Array.from(this.tasks.entries()).map(([id, info]) => ({
            id,
            type: info.type,
            status: info.status
        }));
    }
}

module.exports = new Scheduler();
