const Logger = require('../src/bai4_3_logger_system');
const fs = require('fs');
const path = require('path');

describe('Logger System Module', () => {
    let logger;
    const logFile = path.join(__dirname, 'test_logger.log');

    beforeEach(() => {
        logger = new Logger({ level: 'debug', transports: ['console'] });
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
    });

    test('should log debug messages when level is debug', () => {
        logger.debug('test message');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[DEBUG] test message'));
    });

    test('should not log debug when level is info', () => {
        logger.setLevel('info');
        logger.debug('should not see this');
        expect(console.log).not.toHaveBeenCalled();
    });

    test('should log to file when transport is file', () => {
        const fileLogger = new Logger({ level: 'info', transports: ['file'], logFile });
        fileLogger.info('hello file');
        const content = fs.readFileSync(logFile, 'utf8');
        expect(content).toContain('[INFO] hello file');
    });

    test('should include metadata in logs', () => {
        logger.info('data', { id: 1 });
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('{"id":1}'));
    });
});
