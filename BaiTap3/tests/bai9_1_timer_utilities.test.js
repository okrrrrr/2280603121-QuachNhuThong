const timerUtils = require('../src/bai9_1_timer_utilities');

describe('Timer Utilities Module', () => {
    test('delay should wait', async () => {
        const start = Date.now();
        await timerUtils.delay(100);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(95);
    });

    test('timeout should throw error if slow', async () => {
        const slow = timerUtils.delay(200);
        await expect(timerUtils.timeout(slow, 50)).rejects.toThrow('Operation timed out');
    });

    test('debounce should only execute once', done => {
        const fn = jest.fn();
        const debounced = timerUtils.debounce(fn, 50);
        debounced();
        debounced();
        debounced();
        setTimeout(() => {
            expect(fn).toHaveBeenCalledTimes(1);
            done();
        }, 100);
    });
});
