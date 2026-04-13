const systemInfo = require('../src/bai5_2_system_info');
const os = require('os');

describe('System Info Module', () => {
    test('getCPUInfo should return cpu details', () => {
        const info = systemInfo.getCPUInfo();
        expect(info).toHaveProperty('model');
        expect(info).toHaveProperty('cores');
    });

    test('getMemoryInfo should return memory details', () => {
        const info = systemInfo.getMemoryInfo();
        expect(info).toHaveProperty('total');
        expect(info).toHaveProperty('free');
    });

    test('getOSInfo should return os details', () => {
        const info = systemInfo.getOSInfo();
        expect(info.platform).toBe(os.platform());
    });

    test('getUptime should return a number', () => {
        expect(typeof systemInfo.getUptime()).toBe('number');
    });
});
