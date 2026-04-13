const fs = require('fs').promises;
const path = require('path');

/**
 * Module xử lý tệp tin JSON (Async)
 * @module JsonFileHandler
 */

module.exports = {
    /** * Đọc và parse JSON từ file 
     */
    readJsonAsync: async (filePath) => {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`Read JSON failed: ${error.message}`);
        }
    },

    /** * Ghi JSON vào file với tùy chọn format đẹp (pretty)
     */
    writeJsonAsync: async (filePath, data, pretty = true) => {
        try {
            const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
            await fs.writeFile(filePath, content, 'utf8');
        } catch (error) {
            throw new Error(`Write JSON failed: ${error.message}`);
        }
    },

    /** * Cập nhật JSON: Đọc -> Merge dữ liệu -> Ghi lại 
     */
    updateJsonAsync: async (filePath, updates) => {
        try {
            const currentData = await module.exports.readJsonAsync(filePath);
            const newData = { ...currentData, ...updates };
            await module.exports.writeJsonAsync(filePath, newData);
            return newData;
        } catch (error) {
            throw new Error(`Update JSON failed: ${error.message}`);
        }
    },

    /** * Merge nhiều file JSON thành một file duy nhất 
     */
    mergeJsonFilesAsync: async (filePaths, outputPath) => {
        try {
            let mergedData = {};
            for (const file of filePaths) {
                const data = await module.exports.readJsonAsync(file);
                mergedData = { ...mergedData, ...data };
            }
            await module.exports.writeJsonAsync(outputPath, mergedData);
            return mergedData;
        } catch (error) {
            throw new Error(`Merge JSON failed: ${error.message}`);
        }
    },

    /** * Truy vấn dữ liệu trong file JSON (Giả định data là một Array hoặc Object) 
     */
    queryJsonAsync: async (filePath, queryFn) => {
        try {
            const data = await module.exports.readJsonAsync(filePath);
            // Nếu data là mảng, ta dùng filter, nếu là object ta trả về kết quả hàm query
            return Array.isArray(data) ? data.filter(queryFn) : queryFn(data);
        } catch (error) {
            throw new Error(`Query JSON failed: ${error.message}`);
        }
    }
};