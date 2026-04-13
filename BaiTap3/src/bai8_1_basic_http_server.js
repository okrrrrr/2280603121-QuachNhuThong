const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

/**
 * Bài 8.1: Basic HTTP Server
 * 
 * Server HTTP cơ bản hỗ trợ parse body, routing đơn giản và static files
 * @module basicHttpServer
 */

class BasicServer {
    constructor() {
        this.routes = [];
        this.staticDirs = [];
    }

    addRoute(method, path, handler) {
        this.routes.push({ method, path, handler });
    }

    get(path, handler) { this.addRoute('GET', path, handler); }
    post(path, handler) { this.addRoute('POST', path, handler); }
    put(path, handler) { this.addRoute('PUT', path, handler); }
    delete(path, handler) { this.addRoute('DELETE', path, handler); }

    serveStatic(dir) {
        this.staticDirs.push(dir);
    }

    async _parseRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = req.method;

        res.json = (data) => {
            if (res.writableEnded) return;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        };

        res.status = (code) => {
            res.statusCode = code;
            return res;
        };

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            let body = '';
            await new Promise((resolve) => {
                req.on('data', chunk => body += chunk);
                req.on('end', () => {
                    const contentType = req.headers['content-type'] || '';
                    if (contentType.includes('application/json')) {
                        try { req.body = JSON.parse(body); } catch { req.body = body; }
                    } else if (contentType.includes('application/x-www-form-urlencoded')) {
                        req.body = querystring.parse(body);
                    } else {
                        req.body = body;
                    }
                    resolve();
                });
            });
        }

        req.query = parsedUrl.query;
        req.path = pathname;
    }

    async handleRequest(req, res) {
        await this._parseRequest(req, res);

        const route = this.routes.find(r => r.method === req.method && r.path === req.path);
        if (route) {
            try {
                await route.handler(req, res);
            } catch (err) {
                res.status(500).json({ error: 'Internal Server Error', details: err.message });
            }
            return;
        }

        for (const dir of this.staticDirs) {
            const filePath = path.join(dir, req.path);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const content = fs.readFileSync(filePath);
                res.end(content);
                return;
            }
        }

        if (!res.writableEnded) {
            res.status(404).json({ error: 'Not Found' });
        }
    }

    listen(port, callback) {
        const server = http.createServer((req, res) => this.handleRequest(req, res));
        return server.listen(port, callback);
    }
}

function createServer() {
    return new BasicServer();
}

module.exports = { createServer };
