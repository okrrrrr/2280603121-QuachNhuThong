import { compose, pipe, curry, partial } from '../src/bai2_2_function_composition';

describe('Bài 2.2: Function Composition', () => {
    const add = (a, b) => a + b;
    const square = x => x * x;
    const double = x => x * 2;

    test('compose: nên tính từ phải sang trái', () => {
        // square(double(5)) = square(10) = 100
        const doubleThenSquare = compose(square, double);
        expect(doubleThenSquare(5)).toBe(100);
    });

    test('pipe: nên tính từ trái sang phải', () => {
        // double(square(5)) = double(25) = 50
        const squareThenDouble = pipe(square, double);
        expect(squareThenDouble(5)).toBe(50);
    });

    test('curry: nên hỗ trợ gọi hàm từng bước', () => {
        const curriedAdd = curry(add);
        expect(curriedAdd(2)(3)).toBe(5);
        expect(curriedAdd(2, 3)).toBe(5);
    });

    test('partial: nên cố định tham số đầu tiên', () => {
        const addFive = partial(add, 5);
        expect(addFive(10)).toBe(15);
    });
});