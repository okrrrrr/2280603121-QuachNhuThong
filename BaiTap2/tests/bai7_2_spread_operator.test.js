import { cloneDeep, mergeArraysUnique, updateNestedObject } from '../src/bai7_2_spread_operator';

describe('Bài 7.2: Spread Operator', () => {
    test('cloneDeep nên tạo bản sao không chung tham chiếu', () => {
        const obj = { a: { b: 1 } };
        const cloned = cloneDeep(obj);
        cloned.a.b = 2;
        expect(obj.a.b).toBe(1);
    });

    test('updateNestedObject nên cập nhật immutably', () => {
        const user = { profile: { name: 'Dũng' } };
        const updated = updateNestedObject(user, 'profile.name', 'Dũng Thế');
        expect(updated.profile.name).toBe('Dũng Thế');
        expect(user.profile.name).toBe('Dũng');
    });
});