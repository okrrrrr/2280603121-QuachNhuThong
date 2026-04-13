import { getAllUsers, getUserById } from '../src/bai9_2_api_integration';

describe('Phần 9: Fetch API & Data Handling', () => {
    
    test('9.2: getAllUsers nên lấy được danh sách 10 users', async () => {
        const users = await getAllUsers();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);
    });

    test('9.2: getUserById nên lấy đúng thông tin user 1', async () => {
        const user = await getUserById(1);
        expect(user.id).toBe(1);
        expect(user).toHaveProperty('name');
    });
});