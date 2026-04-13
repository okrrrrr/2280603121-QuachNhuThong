import { DatabaseConnection, UserFactory, QueryBuilder } from '../src/bai15_1_creational_patterns';

describe('Bài 15.1: Creational Patterns - Coverage Max', () => {

    describe('Singleton: DatabaseConnection', () => {
        test('nên trả về cùng một instance và giữ nguyên thuộc tính', () => {
            const db1 = new DatabaseConnection();
            const db2 = new DatabaseConnection();
            expect(db1).toBe(db2);
            expect(db1.query('SELECT 1')).toBe('Executing: SELECT 1');
        });
    });

    describe('Factory: UserFactory', () => {
        test('nên tạo đúng đối tượng Admin (phủ case admin)', () => {
            const admin = UserFactory.create('Dũng Admin', 'admin');
            expect(admin.role).toBe('Admin');
            expect(admin.name).toBe('Dũng Admin');
        });

        test('nên tạo đúng đối tượng User (phủ case user)', () => {
            const user = UserFactory.create('Dũng User', 'user');
            expect(user.role).toBe('User');
        });

        test('nên throw error khi type không hợp lệ (phủ dòng 32-34 - nhánh default)', () => {
            // Đây chính là phần đang bị thiếu coverage của bồ
            expect(() => UserFactory.create('Ghost', 'guest')).toThrow('Loại user không hợp lệ');
        });
    });

    describe('Builder: QueryBuilder', () => {
        test('nên xây dựng câu SQL đầy đủ với nhiều điều kiện WHERE (phủ dòng 55-60)', () => {
            const query = new QueryBuilder()
                .from('users')
                .select('id, name')
                .where('age > 18')
                .where('status = "active"')
                .build();
            
            expect(query).toBe('SELECT id, name FROM users WHERE age > 18 AND status = "active"');
        });

        test('nên xây dựng câu SQL mặc định khi không có WHERE', () => {
            const query = new QueryBuilder().from('products').build();
            expect(query).toBe('SELECT * FROM products');
        });
    });
});