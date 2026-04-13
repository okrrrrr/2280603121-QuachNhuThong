import { mergeArraysUnique, arrayOperations } from '../src/bai7_2_spread_operator';

describe('Phần 7: Destructuring & Spread', () => {

    test('7.2: mergeArraysUnique nên lọc trùng', () => {
        expect(mergeArraysUnique([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
    });

    test('7.2: arrayOperations.push nên trả về mảng mới', () => {
        const arr = [1, 2];
        const newArr = arrayOperations.push(arr, 3);
        expect(newArr).toEqual([1, 2, 3]);
        expect(arr).toHaveLength(2); // Mảng gốc không bị push vào
    });
});