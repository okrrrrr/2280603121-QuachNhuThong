import { EventEmitter, Checkout, PaymentStrategy, CommandManager, AddCommand } from '../src/bai15_2_behavioral_patterns';

describe('Phần 15: Design Patterns', () => {

    test('15.2: Observer - EventEmitter nên báo đúng sự kiện', () => {
        const emitter = new EventEmitter();
        const mockFn = jest.fn();
        emitter.on('login', mockFn);
        emitter.emit('login', 'Dũng');
        expect(mockFn).toHaveBeenCalledWith('Dũng');
    });

    test('15.2: Command - CommandManager hỗ trợ Undo chính xác', () => {
        const manager = new CommandManager();
        manager.execute(new AddCommand(10)); // 0 + 10 = 10
        manager.execute(new AddCommand(5));  // 10 + 5 = 15
        expect(manager.value).toBe(15);
        
        manager.undo(); // 15 - 5 = 10
        expect(manager.value).toBe(10);
    });
});