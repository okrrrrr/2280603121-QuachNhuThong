import { createBankAccount } from '../src/bai1_2_private_variables';

describe('Bài 1.2: Private Variables (Bank Account)', () => {
    let account;

    beforeEach(() => {
        // Khởi tạo tài khoản với 1000đ trước mỗi test case
        account = createBankAccount(1000);
    });

    test('nên hiển thị số dư khởi tạo chính xác', () => {
        expect(account.getBalance()).toBe(1000);
    });

    test('nên gửi tiền (deposit) thành công với số dương', () => {
        account.deposit(500);
        expect(account.getBalance()).toBe(1500);
    });

    test('không nên thay đổi số dư nếu gửi tiền số âm', () => {
        account.deposit(-100);
        expect(account.getBalance()).toBe(1000);
    });

    test('nên rút tiền (withdraw) thành công nếu đủ số dư', () => {
        account.withdraw(400);
        expect(account.getBalance()).toBe(600);
    });

    test('không nên cho phép rút tiền quá số dư hiện có', () => {
        account.withdraw(2000);
        expect(account.getBalance()).toBe(1000); // Vẫn giữ nguyên 1000
    });

    test('nên lưu lại lịch sử giao dịch chính xác', () => {
        account.deposit(500);   // Giao dịch 1
        account.withdraw(200);  // Giao dịch 2
        
        const history = account.getTransactionHistory();
        expect(history.length).toBe(2);
        expect(history[0]).toMatchObject({ type: 'DEPOSIT', amount: 500 });
        expect(history[1]).toMatchObject({ type: 'WITHDRAW', amount: 200 });
    });

    test('không thể thay đổi số dư trực tiếp từ bên ngoài', () => {
        // Thử tìm cách truy cập biến balance (giả sử người dùng đoán tên biến)
        account.balance = 5000000; 
        // Số dư thực sự vẫn phải là 1000 vì biến balance nằm trong closure
        expect(account.getBalance()).toBe(1000);
    });
});