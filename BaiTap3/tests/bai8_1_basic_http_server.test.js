const { createServer } = require('../src/bai8_1_basic_http_server');
const http = require('http');

describe('Basic HTTP Server Module', () => {
    let server;
    const port = 3001;

    beforeAll((done) => {
        const app = createServer();
        app.get('/test', (req, res) => {
            res.json({ message: 'ok' });
        });
        app.post('/echo', (req, res) => {
            res.json(req.body);
        });
        server = app.listen(port, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    test('GET /test should return JSON', (done) => {
        http.get(`http://localhost:${port}/test`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                expect(JSON.parse(data)).toEqual({ message: 'ok' });
                done();
            });
        });
    });

    test('POST /echo should return body', (done) => {
        const postData = JSON.stringify({ a: 1 });
        const req = http.request({
            hostname: 'localhost',
            port: port,
            path: '/echo',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                expect(JSON.parse(data)).toEqual({ a: 1 });
                done();
            });
        });
        req.write(postData);
        req.end();
    });
});
