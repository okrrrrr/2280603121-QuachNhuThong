/**
 * Observer: Cho phép các đối tượng đăng ký và nhận thông báo khi có sự kiện
 */
export class EventEmitter {
    constructor() { this.events = {}; }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}

/**
 * Strategy: Cho phép thay đổi thuật toán thanh toán linh hoạt lúc runtime
 */
export const PaymentStrategy = {
    creditCard: (amount) => `Thanh toán ${amount}đ qua thẻ tín dụng`,
    momo: (amount) => `Thanh toán ${amount}đ qua ví MoMo`,
    cod: (amount) => `Thanh toán ${amount}đ khi nhận hàng`
};

export class Checkout {
    constructor(strategy) { this.strategy = strategy; }
    process(amount) { return this.strategy(amount); }
}

/**
 * Command: Đóng gói thao tác thành Object để hỗ trợ Undo/Redo
 */
export class CommandManager {
    constructor() {
        this.history = [];
        this.value = 0;
    }

    execute(command) {
        this.value = command.execute(this.value);
        this.history.push(command);
    }

    undo() {
        const command = this.history.pop();
        if (command) {
            this.value = command.undo(this.value);
        }
    }
}

export class AddCommand {
    constructor(valueToAdd) { this.valueToAdd = valueToAdd; }
    execute(currentValue) { return currentValue + this.valueToAdd; }
    undo(currentValue) { return currentValue - this.valueToAdd; }
}