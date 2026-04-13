const fileOps = require('../src/bai2_1_file_operations');
const path = require('path');
const fs = require('fs').promises;

const testPath = path.join(__dirname, 'test_file.txt');

describe('Bài 2.1: File Operations', () => {
    
    // Xóa file test sau khi chạy xong
    afterAll(async () => {
        if (await fileOps.fileExistsAsync(testPath)) {
            await fs.unlink(testPath);
        }
    });

    test('Nên ghi và đọc file chính xác', async () => {
        const content = 'Hello World Node.js';
        await fileOps.writeFileAsync(testPath, content);
        const result = await fileOps.readFileAsync(testPath);
        expect(result).toBe(content);
    });

    test('Nên trả về false nếu file không tồn tại', async () => {
        const exists = await fileOps.fileExistsAsync('invisible.txt');
        expect(exists).toBe(false);
    });
});