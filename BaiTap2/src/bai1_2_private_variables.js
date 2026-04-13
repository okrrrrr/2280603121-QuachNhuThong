/**
 * Tạo tài khoản ngân hàng với số dư riêng tư.
 * @param {number} initialBalance Số dư khởi tạo.
 */
export const createBankAccount = (initialBalance) => {
    let balance = initialBalance;
    const transactionHistory = [];

    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                transactionHistory.push({ type: 'DEPOSIT', amount, date: new Date() });
            }
        },
        withdraw(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                transactionHistory.push({ type: 'WITHDRAW', amount, date: new Date() });
            }
        },
        getBalance: () => balance,
        getTransactionHistory: () => [...transactionHistory] // Trả về bản copy để bảo mật
    };
};