import { Range } from '../src/bai12_1_custom_iterators';

describe('Phần 12: Iterators & Generators', () => {

    describe('12.1: Custom Iterators (Range)', () => {
        test('Range nên cho phép lặp bằng vòng lặp for...of', () => {
            const range = new Range(1, 5);
            const results = [];
            for (const num of range) {
                results.push(num);
            }
            expect(results).toEqual([1, 2, 3, 4, 5]);
        });

        test('Range nên trả về done: true khi kết thúc', () => {
            const range = new Range(1, 1);
            const iterator = range[Symbol.iterator]();
            expect(iterator.next()).toEqual({ value: 1, done: false });
            expect(iterator.next().done).toBe(true);
        });
    });

});