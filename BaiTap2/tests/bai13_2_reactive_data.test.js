import { reactive } from '../src/bai13_2_reactive_data';

describe('Phần 13: Proxy & Reflect', () => {

    test('13.2: reactive nên gọi callback khi dữ liệu đổi', () => {
        const cb = jest.fn();
        const state = reactive({ count: 0 }, cb);
        
        state.count = 1;
        expect(cb).toHaveBeenCalledWith('count', 1);
        
        state.count = 1; // Không đổi, không gọi lại
        expect(cb).toHaveBeenCalledTimes(1);
    });
});