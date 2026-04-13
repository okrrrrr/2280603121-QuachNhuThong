/**
 * Compose: Thực thi các hàm từ phải sang trái.
 * @param  {...Function} fns 
 * @returns {Function}
 */
export const compose = (...fns) => (arg) => 
    fns.reduceRight((acc, fn) => fn(acc), arg);

/**
 * Pipe: Thực thi các hàm từ trái sang phải.
 * @param  {...Function} fns 
 * @returns {Function}
 */
export const pipe = (...fns) => (arg) => 
    fns.reduce((acc, fn) => fn(acc), arg);

/**
 * Curry: Chuyển đổi hàm nhiều tham số thành chuỗi các hàm 1 tham số.
 * @param {Function} fn 
 * @returns {Function}
 */
export const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return (...args2) => curried.apply(this, args.concat(args2));
    };
};

/**
 * Partial: Cố định một số tham số trước.
 * @param {Function} fn 
 * @param  {...any} args 
 * @returns {Function}
 */
export const partial = (fn, ...args) => (...restArgs) => 
    fn(...args, ...restArgs);