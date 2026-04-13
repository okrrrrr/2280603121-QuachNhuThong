const fs = require('fs').promises;
const path = require('path');

/**
 * Module xử lý thư mục
 */
module.exports = {
    /** Tạo thư mục (Hỗ trợ tạo nhiều cấp nếu chưa có) */
    createDirAsync: async (dirPath) => {
        try {
            await fs.mkdir(dirPath, { recursive: true });
        } catch (error) {
            throw new Error(`Create dir failed: ${error.message}`);
        }
    },

    /** Liệt kê danh sách file trong thư mục */
    listFilesAsync: async (dirPath) => {
        try {
            return await fs.readdir(dirPath);
        } catch (error) {
            throw new Error(`List files failed: ${error.message}`);
        }
    },

    /** Tính tổng dung lượng thư mục (Đệ quy) */
    getDirSizeAsync: async (dirPath) => {
        let totalSize = 0;
        const files = await fs.readdir(dirPath, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                totalSize += await module.exports.getDirSizeAsync(fullPath);
            } else {
                const stats = await fs.stat(fullPath);
                totalSize += stats.size;
            }
        }
        return totalSize;
    }
};