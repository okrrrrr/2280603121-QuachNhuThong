const dirOps = require('../src/bai2_2_directory_operations');
const path = require('path');
const fs = require('fs').promises;

const testBaseDir = path.join(__dirname, 'test_root');
const subDir = path.join(testBaseDir, 'subdir');
const testFile = path.join(subDir, 'hello.txt');

describe('Bài 2.2: Directory Operations', () => {
    
    // Setup: Tạo môi trường test trước mỗi case
    beforeAll(async () => {
        try {
            await fs.mkdir(testBaseDir, { recursive: true });
        } catch (e) {}
    });

    // Cleanup: Xóa sạch dấu vết sau khi test xong
    afterAll(async () => {
        try {
            await fs.rm(testBaseDir, { recursive: true, force: true });
        } catch (e) {}
    });

    test('createDirAsync: nên tạo thư mục đệ quy thành công', async () => {
        await dirOps.createDirAsync(subDir);
        const stats = await fs.stat(subDir);
        expect(stats.isDirectory()).toBe(true);
    });

    test('listFilesAsync: nên liệt kê được các file trong thư mục', async () => {
        await fs.writeFile(testFile, 'test content');
        const files = await dirOps.listFilesAsync(subDir);
        expect(files).toContain('hello.txt');
    });

    test('getDirSizeAsync: nên tính đúng tổng dung lượng (đệ quy)', async () => {
        const content = 'Hello Node.js'; // 13 bytes
        await fs.writeFile(testFile, content);
        
        const size = await dirOps.getDirSizeAsync(testBaseDir);
        expect(size).toBe(13);
    });

    test('Nên quăng lỗi khi liệt kê thư mục không tồn tại', async () => {
        await expect(dirOps.listFilesAsync('path/to/nowhere'))
            .rejects.toThrow(/List files failed/);
    });
});