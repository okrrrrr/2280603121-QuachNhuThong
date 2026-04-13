import { createValidatedObject, createPrivateProxy } from '../src/bai13_1_proxy_patterns';

describe('Phần 13: Proxy & Reflect', () => {

    test('13.1: ValidatedObject nên chặn giá trị sai', () => {
        const schema = { age: (val) => typeof val === 'number' && val > 0 };
        const user = createValidatedObject(schema);
        
        user.age = 25; // OK
        expect(user.age).toBe(25);
        expect(() => { user.age = -5 }).toThrow();
    });

    test('13.1: PrivateProxy nên ẩn thuộc tính có dấu gạch dưới', () => {
        const data = { name: 'Dũng', _password: '123' };
        const proxy = createPrivateProxy(data);
        
        expect(proxy.name).toBe('Dũng');
        expect(() => proxy._password).toThrow();
        expect('_password' in proxy).toBe(false);
    });

});