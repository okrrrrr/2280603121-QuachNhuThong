import * as Utils from '../src/bai8_2_es6_modules/index';

describe('Bài 8.2: ES6 Modules - Final Coverage Boost', () => {

    describe('arrayUtils.js coverage', () => {
        test('unique: nên loại bỏ các phần tử trùng lặp', () => {
            expect(Utils.unique([1, 1, 2, 2, 3])).toEqual([1, 2, 3]);
        });

        test('chunk: nên chia mảng đúng kích thước (phủ dòng 10-14)', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(Utils.chunk(arr, 2)).toEqual([[1, 2], [3, 4], [5]]);
            expect(Utils.chunk(arr, 5)).toEqual([[1, 2, 3, 4, 5]]);
        });

        test('getRandom: nên trả về một phần tử ngẫu nhiên trong mảng', () => {
            const arr = [10, 20, 30];
            const result = Utils.getRandom(arr);
            expect(arr).toContain(result);
        });
    });

    describe('mathUtils & constants coverage', () => {
        test('PI: nên có giá trị chính xác', () => {
            expect(Utils.PI).toBeCloseTo(3.14159);
        });

        test('calculateCircleArea: nên tính đúng diện tích', () => {
            expect(Utils.calculateCircleArea(10)).toBeCloseTo(314.159);
        });
    });

    describe('stringUtils coverage', () => {
        test('capitalize: nên viết hoa chữ cái đầu', () => {
            expect(Utils.capitalize('gemini')).toBe('Gemini');
            expect(Utils.capitalize('a')).toBe('A');
        });
    });
});