import { extractUserInfo, swapValues, removeProperty } from '../src/bai7_1_destructuring';

describe('Phần 7: Destructuring & Spread', () => {
    
    test('7.1: extractUserInfo nên lấy đúng city từ nested object', () => {
        const user = { name: 'Dũng', address: { city: 'Hồ Chí Minh' } };
        expect(extractUserInfo(user)).toBe('Dũng lives in Hồ Chí Minh');
    });

    test('7.1: swapValues nên đổi chỗ thành công', () => {
        expect(swapValues(1, 2)).toEqual([2, 1]);
    });

    test('7.1: removeProperty nên trả về object mới không có prop đó', () => {
        const obj = { a: 1, b: 2 };
        expect(removeProperty(obj, 'a')).toEqual({ b: 2 });
        expect(obj).toEqual({ a: 1, b: 2 }); // Object cũ không đổi
    });

});