const bufferOps = require('../src/bai3_1_buffer_operations');
const streamUtils = require('../src/bai3_2_stream_utilities');
const path = require('path');
const fs = require('fs');

describe('Phần 3: Streams & Buffers', () => {
    
    describe('3.1: Buffer Operations', () => {
        test('Nên chuyển đổi qua lại giữa String và Buffer', () => {
            const str = 'Node.js';
            const buf = bufferOps.fromString(str);
            expect(bufferOps.toString(buf)).toBe(str);
            // Check base64
            expect(bufferOps.toString(buf, 'base64')).toBe(btoa(str));
        });

        test('Nên nối các buffers thành công', () => {
            const b1 = bufferOps.fromString('Hello ');
            const b2 = bufferOps.fromString('World');
            const merged = bufferOps.concat([b1, b2]);
            expect(bufferOps.toString(merged)).toBe('Hello World');
        });
    });

    describe('3.2: Stream Utilities', () => {
        const src = path.join(__dirname, 'source.txt');
        const dest = path.join(__dirname, 'dest.txt.gz');
        const unzipped = path.join(__dirname, 'unzipped.txt');

        beforeAll(() => fs.writeFileSync(src, 'Dữ liệu cực lớn để nén thử'));
        afterAll(() => {
            [src, dest, unzipped].forEach(f => { if(fs.existsSync(f)) fs.unlinkSync(f) });
        });

        test('Nên nén và giải nén file thành công', async () => {
            await streamUtils.compressFile(src, dest);
            expect(fs.existsSync(dest)).toBe(true);

            await streamUtils.decompressFile(dest, unzipped);
            const content = fs.readFileSync(unzipped, 'utf8');
            expect(content).toBe('Dữ liệu cực lớn để nén thử');
        });
    });
});