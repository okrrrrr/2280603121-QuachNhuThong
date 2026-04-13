const app = require('../src/bai8_3_rest_api_server');
const http = require('http');

describe('REST API Server Module', () => {
    let server;
    const port = 3002;

    beforeAll((done) => {
        server = app.listen(port, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    test('GET /api/tasks should return list', (done) => {
        http.get(`http://localhost:${port}/api/tasks`, (res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });

    test('POST /api/tasks should create task', (done) => {
        const data = JSON.stringify({ title: 'New Task' });
        const req = http.request({
            hostname: 'localhost',
            port: port,
            path: '/api/tasks',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            expect(res.statusCode).toBe(201);
            done();
        });
        req.write(data);
        req.end();
    });
});
