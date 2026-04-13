/** Class Range cho phép lặp từ start đến end */
export class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    // Cú pháp đặc biệt để biến class thành Iterable
    [Symbol.iterator]() {
        let current = this.start;
        const last = this.end;

        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}