const fs = require('fs').promises;
const path = require('path');

/**
 * Module xử lý các thao tác với tệp tin (Async)
 * @module FileOperations
 */

module.exports = {
    /** Đọc nội dung file */
    readFileAsync: async (filePath) => {
        try {
            return await fs.readFile(filePath, 'utf8');
        } catch (error) {
            throw new Error(`Read failed: ${error.message}`);
        }
    },

    /** Ghi file (Ghi đè nếu đã tồn tại) */
    writeFileAsync: async (filePath, content) => {
        try {
            await fs.writeFile(filePath, content, 'utf8');
        } catch (error) {
            throw new Error(`Write failed: ${error.message}`);
        }
    },

    /** Thêm nội dung vào cuối file */
    appendFileAsync: async (filePath, content) => {
        try {
            await fs.appendFile(filePath, content, 'utf8');
        } catch (error) {
            throw new Error(`Append failed: ${error.message}`);
        }
    },

    /** Xóa file */
    deleteFileAsync: async (filePath) => {
        try {
            await fs.unlink(filePath);
        } catch (error) {
            throw new Error(`Delete failed: ${error.message}`);
        }
    },

    /** Kiểm tra file có tồn tại không */
    fileExistsAsync: async (filePath) => {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    },

    /** Lấy thông tin chi tiết của file (size, ngày tạo...) */
    getFileStatsAsync: async (filePath) => {
        try {
            return await fs.stat(filePath);
        } catch (error) {
            throw new Error(`Get stats failed: ${error.message}`);
        }
    }
};