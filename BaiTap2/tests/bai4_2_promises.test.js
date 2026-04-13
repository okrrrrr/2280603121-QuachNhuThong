import { wait, fetchMultipleUsers } from '../src/bai4_2_promises';

describe('Phần 4.2: fetchMultipleUsers', () => {
    test('Nên lấy được danh sách users', async () => {
        const users = await fetchMultipleUsers([1, 2]);
        expect(users).toHaveLength(2);
        expect(users[0].name).toBe('User 1');
    });

});