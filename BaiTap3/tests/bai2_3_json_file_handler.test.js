const jsonHandler = require('../src/bai2_3_json_file_handler');
const path = require('path');
const fs = require('fs').promises;

const testJsonPath = path.join(__dirname, 'data.json');

describe('Bài 2.3: JSON File Handler', () => {
    
    // Dọn dẹp trước và sau khi test
    const cleanup = async () => {
        try { await fs.unlink(testJsonPath); } catch (e) {}
    };

    beforeEach(cleanup);
    afterAll(cleanup);

    test('Nên ghi và đọc JSON thành công', async () => {
        const data = { name: 'Dũng', age: 20 };
        await jsonHandler.writeJsonAsync(testJsonPath, data);
        const result = await jsonHandler.readJsonAsync(testJsonPath);
        expect(result).toEqual(data);
    });

    test('updateJsonAsync nên merge dữ liệu mới vào dữ liệu cũ', async () => {
        await jsonHandler.writeJsonAsync(testJsonPath, { id: 1, status: 'active' });
        await jsonHandler.updateJsonAsync(testJsonPath, { status: 'completed', score: 100 });
        
        const result = await jsonHandler.readJsonAsync(testJsonPath);
        expect(result.id).toBe(1);
        expect(result.status).toBe('completed');
        expect(result.score).toBe(100);
    });

    test('queryJsonAsync nên lọc được mảng dữ liệu', async () => {
        const users = [
            { id: 1, role: 'admin' },
            { id: 2, role: 'user' },
            { id: 3, role: 'admin' }
        ];
        await jsonHandler.writeJsonAsync(testJsonPath, users);
        const admins = await jsonHandler.queryJsonAsync(testJsonPath, u => u.role === 'admin');
        expect(admins).toHaveLength(2);
    });
});