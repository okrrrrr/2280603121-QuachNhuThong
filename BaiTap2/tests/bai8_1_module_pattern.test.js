import { Calculator } from '../src/bai8_1_module_pattern';

describe('Phần 8: Modules & Imports', () => {
    
    test('8.1: Calculator nên giữ history riêng tư', () => {
        Calculator.add(10, 5);
        expect(Calculator.getHistory().length).toBe(1);
        // Không thể truy cập trực tiếp biến history
        expect(Calculator.history).toBeUndefined();
    });

});