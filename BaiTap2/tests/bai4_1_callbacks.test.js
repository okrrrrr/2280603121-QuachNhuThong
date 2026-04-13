import { readFileSimulation, callbackHell } from '../src/bai4_1_callbacks';

describe('Bài 4.1: Callbacks', () => {
    test('readFileSimulation nên trả về data khi thành công', (done) => {
        readFileSimulation('test.txt', (err, data) => {
            expect(err).toBeNull();
            expect(data).toContain('test.txt');
            done();
        });
    });

    test('callbackHell nên thực hiện chuỗi async', (done) => {
        callbackHell((result) => {
            expect(result).toBeDefined();
            done();
        });
    });
});