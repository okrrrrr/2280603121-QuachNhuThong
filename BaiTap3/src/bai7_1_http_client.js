const http = require('http');
const https = require('https');
const { URL } = require('url');
const fs = require('fs');

/**
 * Bài 7.1: HTTP Client Module
 * 
 * Module thực hiện các request HTTP/HTTPS sử dụng built-in modules
 * @module httpClient
 */

function request(url, method, data = null, options = {}) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;

        const requestOptions = {
            method,
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + parsedUrl.search,
            headers: {
                'User-Agent': 'Node.js/HttpClient',
                ...options.headers
            },
            timeout: options.timeout || 10000
        };

        if (data) {
            const body = typeof data === 'object' ? JSON.stringify(data) : data;
            requestOptions.headers['Content-Type'] = requestOptions.headers['Content-Type'] || 'application/json';
            requestOptions.headers['Content-Length'] = Buffer.byteLength(body);
        }

        const req = protocol.request(url, requestOptions, (res) => {
            if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
                return resolve(request(res.headers.location, method, data, options));
            }

            let responseData = '';
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                let parsed;
                try {
                    parsed = JSON.parse(responseData);
                } catch {
                    parsed = responseData;
                }
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: parsed
                });
            });
        });

        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timed out'));
        });

        if (data) {
            req.write(typeof data === 'object' ? JSON.stringify(data) : data);
        }
        req.end();
    });
}

function get(url, options) { return request(url, 'GET', null, options); }
function post(url, data, options) { return request(url, 'POST', data, options); }
function put(url, data, options) { return request(url, 'PUT', data, options); }
function del(url, options) { return request(url, 'DELETE', null, options); }

/**
 * Download file từ URL
 * @param {string} url - URL của file
 * @param {string} destPath - Đường dẫn lưu tệp
 * @returns {Promise<void>}
 */
function download(url, destPath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download: Status ${res.statusCode}`));
                return;
            }
            const fileStream = fs.createWriteStream(destPath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
        }).on('error', reject);
    });
}

module.exports = {
    get,
    post,
    put,
    delete: del,
    download
};
