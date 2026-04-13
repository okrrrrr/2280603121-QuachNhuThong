import { fibonacci, paginate } from '../src/bai12_2_generators';

describe('Phần 12: Iterators & Generators', () => {

    describe('12.2: Generators', () => {
        test('fibonacci generator nên tạo ra dãy số chính xác', () => {
            const gen = fibonacci(6);
            // Fibonacci: 0, 1, 1, 2, 3, 5
            expect([...gen]).toEqual([0, 1, 1, 2, 3, 5]);
        });

        test('paginate generator nên chia nhỏ mảng theo trang', () => {
            const items = [1, 2, 3, 4, 5];
            const pageSize = 2;
            const pages = [...paginate(items, pageSize)];
            
            expect(pages).toHaveLength(3);
            expect(pages[0]).toEqual([1, 2]);
            expect(pages[1]).toEqual([3, 4]);
            expect(pages[2]).toEqual([5]);
        });

        test('generator nên cho phép lấy giá trị từng bước bằng .next()', () => {
            const gen = fibonacci(2);
            expect(gen.next().value).toBe(0);
            expect(gen.next().value).toBe(1);
            expect(gen.next().done).toBe(true);
        });
    });
});