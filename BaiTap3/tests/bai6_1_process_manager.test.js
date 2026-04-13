const processManager = require('../src/bai6_1_process_manager');

describe('Process Manager Module', () => {
    test('getProcessInfo should return current pid', () => {
        const info = processManager.getProcessInfo();
        expect(info.pid).toBe(process.pid);
    });

    test('getEnvVariable and setEnvVariable should work', () => {
        processManager.setEnvVariable('TEST_VAR', 'hello');
        expect(processManager.getEnvVariable('TEST_VAR')).toBe('hello');
        delete process.env.TEST_VAR;
    });

    test('getMemoryUsage should return formatted string', () => {
        const usage = processManager.getMemoryUsage();
        expect(usage.rss).toMatch(/MB/);
    });
});
