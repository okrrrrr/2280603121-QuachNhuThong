import { 
    getProductNames, 
    getInStockProducts, 
    getTotalValue, 
    groupByCategory, 
    sortByPrice, 
    applyDiscount 
} from '../src/bai5_1_data_transformation';

const products = [
    { id: 1, name: 'Laptop', price: 1000, category: 'Electronics', inStock: true },
    { id: 2, name: 'Phone', price: 500, category: 'Electronics', inStock: false },
    { id: 3, name: 'Shirt', price: 50, category: 'Clothing', inStock: true }
];

describe('Bài 5.1: Data Transformation - Coverage Boost', () => {

    test('getProductNames: lấy đúng danh sách tên', () => {
        expect(getProductNames(products)).toEqual(['Laptop', 'Phone', 'Shirt']);
    });

    test('groupByCategory: nhóm đúng (phủ dòng 22-23)', () => {
        const grouped = groupByCategory(products);
        expect(grouped['Electronics']).toHaveLength(2);
        expect(grouped['Clothing']).toHaveLength(1);
    });

    test('sortByPrice: phủ cả 2 trường hợp asc và desc (phủ dòng 29)', () => {
        // Test ASC
        const asc = sortByPrice(products, 'asc');
        expect(asc[0].price).toBe(50);
        
        // Test DESC - Đây là phần bồ đang thiếu coverage
        const desc = sortByPrice(products, 'desc');
        expect(desc[0].price).toBe(1000);
    });

    test('applyDiscount: tính đúng giá mới và không làm hỏng mảng gốc', () => {
        const discounted = applyDiscount(products, 10);
        expect(discounted[0].price).toBe(900);
        expect(products[0].price).toBe(1000); // Gốc vẫn giữ nguyên
    });
});