const objectUtils = require('../src/bai12_1_object_utilities');

describe('Object Utilities Module', () => {
    test('deepClone should create a full copy', () => {
        const obj = { a: 1, b: { c: 2 } };
        const clone = objectUtils.deepClone(obj);
        expect(clone).toEqual(obj);
        expect(clone.b).not.toBe(obj.b);
    });

    test('get should return nested value', () => {
        const obj = { a: { b: { c: 3 } } };
        expect(objectUtils.get(obj, 'a.b.c')).toBe(3);
        expect(objectUtils.get(obj, 'a.x', 'default')).toBe('default');
    });

    test('flatten should return flat object', () => {
        const obj = { a: { b: 1 }, c: 2 };
        expect(objectUtils.flatten(obj)).toEqual({ 'a.b': 1, 'c': 2 });
    });

    test('unflatten should reconstruct object', () => {
        const flat = { 'a.b': 1, 'c': 2 };
        expect(objectUtils.unflatten(flat)).toEqual({ a: { b: 1 }, c: 2 });
    });
});
