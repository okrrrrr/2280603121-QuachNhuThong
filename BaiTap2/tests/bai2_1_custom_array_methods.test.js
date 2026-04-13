import { 
    customMap, customFilter, customReduce, 
    customFind, customEvery, customSome 
} from '../src/bai2_1_custom_array_methods';

describe('Bài 2.1: Custom Array Methods', () => {
    const nums = [1, 2, 3, 4, 5];

    test('customMap: nhân đôi mảng', () => {
        expect(customMap(nums, x => x * 2)).toEqual([2, 4, 6, 8, 10]);
    });

    test('customFilter: lọc số lớn hơn 3', () => {
        expect(customFilter(nums, x => x > 3)).toEqual([4, 5]);
    });

    test('customReduce: tính tổng', () => {
        expect(customReduce(nums, (a, b) => a + b, 0)).toBe(15);
    });

    test('customFind: tìm số chẵn đầu tiên', () => {
        expect(customFind(nums, x => x % 2 === 0)).toBe(2);
        expect(customFind(nums, x => x > 10)).toBeUndefined();
    });

    test('customEvery: kiểm tra tất cả là số dương', () => {
        expect(customEvery(nums, x => x > 0)).toBe(true);
        expect(customEvery(nums, x => x > 3)).toBe(false);
    });

    test('customSome: kiểm tra có số nào lớn hơn 4 không', () => {
        expect(customSome(nums, x => x > 4)).toBe(true);
        expect(customSome(nums, x => x < 0)).toBe(false);
    });
});