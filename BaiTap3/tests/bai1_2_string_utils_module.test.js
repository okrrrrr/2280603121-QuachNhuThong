const stringUtils = require('../src/bai1_2_string_utils_module');

describe('Bài 1.2: String Utils Module', () => {
    test('Nên xử lý các biến đổi chuỗi cơ bản', () => {
        expect(stringUtils.capitalize('node')).toBe('Node');
        expect(stringUtils.reverse('abc')).toBe('cba');
        expect(stringUtils.countWords('  hello   world  ')).toBe(2);
        expect(stringUtils.truncate('Hello World', 5)).toBe('Hello...');
    });

    test('isPalindrome: kiểm tra tính đối xứng', () => {
        expect(stringUtils.isPalindrome('Race car')).toBe(true);
        expect(stringUtils.isPalindrome('hello')).toBe(false);
    });

    test('slugify & camelCase & snakeCase', () => {
        expect(stringUtils.slugify('Học Node.js Cơ Bản!')).toBe('hoc-nodejs-co-ban');
        expect(stringUtils.camelCase('hello_world_id')).toBe('helloWorldId');
        expect(stringUtils.snakeCase('camelCaseString')).toBe('camel_case_string');
    });
});