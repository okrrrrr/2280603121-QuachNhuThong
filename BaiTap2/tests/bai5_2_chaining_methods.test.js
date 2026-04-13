import { getExpensiveInStockElectronics, calculateCategoryStats } from '../src/bai5_2_chaining_methods';

const mockProducts = [
    { id: 1, name: 'Laptop', price: 1000, category: 'Electronics', inStock: true },
    { id: 2, name: 'Phone', price: 500, category: 'Electronics', inStock: false },
    { id: 3, name: 'Shirt', price: 50, category: 'Clothing', inStock: true }
];

describe('Bài 5.2: Chaining Methods', () => {
    test('nên lấy electronics còn hàng giá > 200', () => {
        const result = getExpensiveInStockElectronics(mockProducts);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Laptop');
    });

    test('nên tính toán stats cho từng category', () => {
        const stats = calculateCategoryStats(mockProducts);
        expect(stats).toHaveProperty('Electronics');
        expect(stats.Electronics.count).toBe(2);
    });
});