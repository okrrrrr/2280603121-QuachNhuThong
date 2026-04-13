import { 
    validateEmail, 
    validatePhone, 
    validatePassword, 
    extractUrls, 
    highlightMatches 
} from '../src/bai14_1_regex_utilities';

describe('Bài 14.1: Regex Utilities', () => {

    test('validatePassword nên kiểm tra độ mạnh mật khẩu chính xác', () => {
        expect(validatePassword('Abc@1234')).toBe(true);  // Thỏa mãn mọi điều kiện
        expect(validatePassword('12345678')).toBe(false); // Thiếu chữ cái
        expect(validatePassword('abcdefgh')).toBe(false); // Thiếu chữ hoa, số
        expect(validatePassword('Abc12345')).toBe(false); // Thiếu ký tự đặc biệt
    });

    test('validatePhone nên nhận diện đúng số điện thoại VN', () => {
        expect(validatePhone('0912345678')).toBe(true);
        expect(validatePhone('0123456789')).toBe(false); // Đầu 01 không còn dùng
    });

    test('highlightMatches nên wrap text khớp bằng tag mark', () => {
        const text = 'JavaScript is awesome';
        const result = highlightMatches(text, 'JavaScript');
        expect(result).toBe('<mark>JavaScript</mark> is awesome');
    });

    test('extractUrls nên lấy được danh sách URL', () => {
        const text = 'Check out https://google.com and http://github.com';
        expect(extractUrls(text)).toEqual(['https://google.com', 'http://github.com']);
    });
});