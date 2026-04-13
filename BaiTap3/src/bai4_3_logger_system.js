const EventEmitter = require('events');
const fs = require('fs');

/**
 * Bài 4.3: Logger System
 * 
 * Hệ thống logger linh hoạt sử dụng EventEmitter
 * @class Logger
 * @extends EventEmitter
 */
class Logger extends EventEmitter {
    constructor(options = {}) {
        super();
        this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
        this.currentLevel = options.level || 'info';
        this.transports = options.transports || ['console'];
        this.logFile = options.logFile || 'app.log';

        Object.keys(this.levels).forEach(level => {
            this.on(level, (message, meta) => {
                this.log(level, message, meta);
            });
        });
    }

    /**
     * Thiết lập mức độ log tối thiểu
     * @param {string} level - debug, info, warn, error
     */
    setLevel(level) {
        if (this.levels[level] !== undefined) {
            this.currentLevel = level;
        }
    }

    /**
     * Ghi log
     * @param {string} level - Level của log
     * @param {string} message - Nội dung
     * @param {Object} [meta] - Metadata đính kèm
     */
    log(level, message, meta = {}) {
        if (this.levels[level] < this.levels[this.currentLevel]) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            message,
            metadata: meta
        };

        const formatted = `[${logEntry.timestamp}] [${logEntry.level}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;

        if (this.transports.includes('console')) {
            console.log(formatted);
        }

        if (this.transports.includes('file')) {
            fs.appendFileSync(this.logFile, formatted + '\n');
        }
    }

    debug(msg, meta) { this.emit('debug', msg, meta); }
    info(msg, meta) { this.emit('info', msg, meta); }
    warn(msg, meta) { this.emit('warn', msg, meta); }
    error(msg, meta) { this.emit('error', msg, meta); }
}

module.exports = Logger;
