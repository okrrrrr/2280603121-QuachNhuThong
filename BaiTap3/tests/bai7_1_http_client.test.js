const httpClient = require('../src/bai7_1_http_client');
const https = require('https');
const { EventEmitter } = require('events');

jest.mock('https');

describe('HTTP Client Module', () => {
    test('get should make an HTTPS request', async () => {
        const mockRes = new EventEmitter();
        mockRes.statusCode = 200;
        mockRes.headers = {};

        https.request.mockImplementation((url, opts, cb) => {
            cb(mockRes);
            setTimeout(() => {
                mockRes.emit('data', '{"ok": true}');
                mockRes.emit('end');
            }, 10);
            return { on: jest.fn(), end: jest.fn() };
        });

        const response = await httpClient.get('https://example.com');
        expect(response.data.ok).toBe(true);
    });
});
