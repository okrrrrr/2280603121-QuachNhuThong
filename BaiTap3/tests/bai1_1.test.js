const math = require('../src/bai1_1_math_module');

describe('Bài 1.1: Math Module', () => {
    test('nên thực hiện các phép tính cơ bản', () => {
        expect(math.add(5, 3)).toBe(8);
        expect(math.subtract(10, 4)).toBe(6);
    });

    test('nên quăng lỗi khi chia cho 0', () => {
        expect(() => math.divide(10, 0)).toThrow("Cannot divide by zero");
    });

    test('nên tính đúng n số Fibonacci', () => {
        expect(math.fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });
});