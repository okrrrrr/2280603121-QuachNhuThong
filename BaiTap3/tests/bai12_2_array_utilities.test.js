const arrayUtils = require('../src/bai12_2_array_utilities');

describe('Array Utilities Module', () => {
    test('chunk should split array', () => {
        expect(arrayUtils.chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    });

    test('unique should remove duplicates', () => {
        expect(arrayUtils.unique([1, 1, 2, 2])).toEqual([1, 2]);
    });

    test('intersection should find common elements', () => {
        expect(arrayUtils.intersection([1, 2], [2, 3])).toEqual([2]);
    });

    test('groupBy should group by key', () => {
        const arr = [{ type: 'a', val: 1 }, { type: 'a', val: 2 }, { type: 'b', val: 3 }];
        const grouped = arrayUtils.groupBy(arr, 'type');
        expect(grouped.a).toHaveLength(2);
        expect(grouped.b).toHaveLength(1);
    });
});
