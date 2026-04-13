import { debounce, throttle } from '../src/bai11_2_debounce_throttle';

describe('Phần 11: Event Loop & Concurrency', () => {
    
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    describe('11.2: Debounce & Throttle', () => {
        test('debounce nên đợi đủ thời gian mới thực thi', () => {
            const func = jest.fn();
            const debounced = debounce(func, 500);
            
            debounced();
            debounced();
            jest.advanceTimersByTime(500);
            
            expect(func).toHaveBeenCalledTimes(1);
        });

        test('throttle nên thực thi ngay và chặn các lần gọi sau trong khoảng limit', () => {
            const func = jest.fn();
            const throttled = throttle(func, 500);
            
            throttled(); // Gọi ngay lập tức
            throttled(); // Bị chặn
            
            expect(func).toHaveBeenCalledTimes(1);
            
            jest.advanceTimersByTime(500);
            throttled(); // Bây giờ mới được gọi tiếp
            expect(func).toHaveBeenCalledTimes(2);
        });
    });
});