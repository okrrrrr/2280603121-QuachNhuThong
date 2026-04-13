import { 
    ValidationError, 
    NetworkError, 
    AuthenticationError, 
    validateUser, 
    handleError 
} from '../src/bai6_1_custom_errors';

describe('Bài 6.1: Custom Errors - Final Coverage', () => {

    describe('Kiểm tra các Custom Error Classes', () => {
        test('Nên khởi tạo đúng name và message cho từng loại lỗi', () => {
            const vErr = new ValidationError("Lỗi validate");
            const nErr = new NetworkError("Lỗi mạng");
            const aErr = new AuthenticationError("Lỗi auth");

            expect(vErr.name).toBe("ValidationError");
            expect(nErr.name).toBe("NetworkError");
            expect(aErr.name).toBe("AuthenticationError");
            expect(vErr.message).toBe("Lỗi validate");
        });
    });

    describe('validateUser function', () => {
        test('Nên throw ValidationError khi thiếu username ', () => {
            expect(() => validateUser({ email: 'test@gmail.com' })).toThrow(ValidationError);
        });

        test('Nên throw ValidationError khi email sai định dạng ', () => {
            expect(() => validateUser({ username: 'dung', email: 'sai-email' })).toThrow("Email không hợp lệ");
        });

        test('Nên trả về true khi dữ liệu hợp lệ', () => {
            expect(validateUser({ username: 'dung', email: 'dung@gmail.com' })).toBe(true);
        });
    });

    describe('handleError function', () => {
        test('Nên xử lý đúng tất cả các loại lỗi ', () => {
            expect(handleError(new ValidationError("Trống"))).toContain("Dữ liệu sai");
            expect(handleError(new NetworkError("404"))).toContain("Lỗi kết nối");
            expect(handleError(new AuthenticationError("Expired"))).toContain("Lỗi bảo mật");
            expect(handleError(new Error("Lỗi lạ"))).toBe("Lỗi không xác định");
        });
    });
});