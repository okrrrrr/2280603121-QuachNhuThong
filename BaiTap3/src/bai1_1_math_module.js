/**
 * Module thực hiện các phép toán cơ bản và nâng cao.
 * @module mathOperations
 */

/**
 * Chia hai số và kiểm tra lỗi chia cho 0.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 * @throws {Error} Nếu b bằng 0.
 */
const divide = (a, b) => {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
};

/**
 * Tính giai thừa của n bằng đệ quy.
 * @param {number} n 
 * @returns {number}
 */
const factorial = (n) => {
    if (n < 0) return undefined;
    if (n === 0) return 1;
    return n * factorial(n - 1);
};

/**
 * Kiểm tra một số có phải số nguyên tố hay không.
 * @param {number} n 
 * @returns {boolean}
 */
const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};

/**
 * Trả về n số Fibonacci đầu tiên.
 * @param {number} n 
 * @returns {number[]}
 */
const fibonacci = (n) => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence.slice(0, n);
};

module.exports = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide,
    power: (base, exp) => Math.pow(base, exp),
    factorial,
    isPrime,
    fibonacci
};