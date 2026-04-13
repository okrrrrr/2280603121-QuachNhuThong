const validator = require('../src/bai1_3_validator_module');

describe('Bài 1.3: Validator Module', () => {
    test('isEmail & isURL & isPhoneVN', () => {
        expect(validator.isEmail('test@gmail.com')).toBe(true);
        expect(validator.isURL('https://google.com')).toBe(true);
        expect(validator.isPhoneVN('0912345678')).toBe(true);
    });

    test('isStrongPassword: độ dài > 8, có hoa, thường, số, ký tự đặc biệt', () => {
        expect(validator.isStrongPassword('Abc123!@#')).toBe(true);
        expect(validator.isStrongPassword('123456')).toBe(false);
    });

    test('isCreditCard: Thuật toán Luhn', () => {
        expect(validator.isCreditCard('79927398713')).toBe(true); // Số mẫu Luhn chuẩn
        expect(validator.isCreditCard('79927398710')).toBe(false);
    });

    test('isDate: Định dạng YYYY-MM-DD', () => {
        expect(validator.isDate('2026-02-28', 'YYYY-MM-DD')).toBe(true);
        expect(validator.isDate('2026-02-30', 'YYYY-MM-DD')).toBe(false); // Ngày không tồn tại
    });
});