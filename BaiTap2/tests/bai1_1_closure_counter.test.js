import { createCounter } from '../src/bai1_1_closure_counter';

describe('Bài 1.1: Closure Counter', () => {
    let counter;

    beforeEach(() => {
        counter = createCounter();
    });

    test('nên bắt đầu bằng giá trị 0', () => {
        expect(counter.getValue()).toBe(0);
    });

    test('nên tăng giá trị chính xác', () => {
        counter.increment();
        counter.increment();
        expect(counter.getValue()).toBe(2);
    });

    test('nên giảm giá trị chính xác', () => {
        counter.increment();
        counter.decrement();
        expect(counter.getValue()).toBe(0);
    });

    test('nên reset về 0', () => {
        counter.increment();
        counter.reset();
        expect(counter.getValue()).toBe(0);
    });
});