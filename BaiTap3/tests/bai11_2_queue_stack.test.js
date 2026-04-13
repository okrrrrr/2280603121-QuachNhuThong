const { Queue, Stack } = require('../src/bai11_2_queue_stack');

describe('Queue & Stack Module', () => {
    describe('Queue', () => {
        let q;
        beforeEach(() => q = new Queue());

        test('enqueue/dequeue should work (FIFO)', () => {
            q.enqueue(1);
            q.enqueue(2);
            expect(q.dequeue()).toBe(1);
            expect(q.dequeue()).toBe(2);
        });

        test('peek should show first item', () => {
            q.enqueue(1);
            expect(q.peek()).toBe(1);
            expect(q.size).toBe(1);
        });
    });

    describe('Stack', () => {
        let s;
        beforeEach(() => s = new Stack());

        test('push/pop should work (LIFO)', () => {
            s.push(1);
            s.push(2);
            expect(s.pop()).toBe(2);
            expect(s.pop()).toBe(1);
        });

        test('peek should show top item', () => {
            s.push(1);
            s.push(2);
            expect(s.peek()).toBe(2);
        });
    });
});
