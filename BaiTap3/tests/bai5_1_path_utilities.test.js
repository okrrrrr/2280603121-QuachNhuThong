const pathUtils = require('../src/bai5_1_path_utilities');
const path = require('path');

describe('Path Utilities Module', () => {
    test('normalizePath should work', () => {
        expect(pathUtils.normalizePath('a//b/c/..')).toBe(path.normalize('a/b'));
    });

    test('joinPaths should join correctly', () => {
        expect(pathUtils.joinPaths('a', 'b', 'c')).toBe(path.join('a', 'b', 'c'));
    });

    test('getExtension should return ext', () => {
        expect(pathUtils.getExtension('test.txt')).toBe('.txt');
    });

    test('getBasename should return filename', () => {
        expect(pathUtils.getBasename('/path/to/file.js')).toBe('file.js');
    });

    test('isAbsolute should check correctly', () => {
        expect(pathUtils.isAbsolute('/a/b')).toBe(path.isAbsolute('/a/b'));
        expect(pathUtils.isAbsolute('a/b')).toBe(false);
    });
});
