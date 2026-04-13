import { tryCatch, safeJsonParse, withTimeout, withRetry } from '../src/bai6_2_error_handling_patterns';

describe('Bài 6.2: Error Handling Patterns - Coverage Boost', () => {

    test('tryCatch: nên trả về kết quả khi hàm chạy thành công', () => {
        const [err, res] = tryCatch(() => "OK");
        expect(err).toBeNull();
        expect(res).toBe("OK");
    });

    test('tryCatch: nên trả về lỗi khi hàm bị throw (phủ dòng catch)', () => {
        const [err, res] = tryCatch(() => { throw new Error("Fail") });
        expect(err.message).toBe("Fail");
        expect(res).toBeNull();
    });

    test('safeJsonParse: nên trả về null khi JSON sai định dạng (phủ dòng 15-17)', () => {
        expect(safeJsonParse('{ sai-dinh-dang }')).toBeNull();
    });

    test('withTimeout: nên quăng lỗi nếu Promise chạy quá chậm (phủ dòng 24-25)', async () => {
        const slowPromise = new Promise(resolve => setTimeout(resolve, 200));
        await expect(withTimeout(slowPromise, 100)).rejects.toThrow("Timeout!");
    });

    test('withRetry: nên quăng lỗi cuối cùng sau khi hết số lần thử (phủ dòng 33-35)', async () => {
        const failFn = jest.fn().mockRejectedValue(new Error("Always Fail"));
        
        // Dùng delay = 0 để test chạy nhanh
        await expect(withRetry(failFn, 2, 0)).rejects.toThrow("Always Fail");
        
        // Phải gọi 3 lần: 1 lần đầu + 2 lần retry
        expect(failFn).toHaveBeenCalledTimes(3);
    });
});