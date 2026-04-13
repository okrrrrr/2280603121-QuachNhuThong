import { preventBlockingUI } from '../src/bai11_1_event_loop';

describe('Phần 11: Event Loop (Fake Timers)', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('preventBlockingUI nên xử lý đầy đủ 25 phần tử', async () => {
        const processFn = jest.fn();
        const items = Array.from({ length: 25 }, (_, i) => i);
        
        const promise = preventBlockingUI(items, processFn);
        
        // Chạy tất cả các timer đang chờ (bao gồm cả các setTimeout đệ quy)
        jest.runAllTimers();
        
        await promise;
        
        expect(processFn).toHaveBeenCalledTimes(25);
    });
});