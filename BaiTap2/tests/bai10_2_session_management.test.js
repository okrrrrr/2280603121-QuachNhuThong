import { 
    createSession, 
    getSession, 
    isSessionValid, 
    destroySession 
} from '../src/bai10_2_session_management'; 

describe('Phần 10: Storage APIs & Session Management', () => {
    
    beforeEach(() => {
        // Giả lập localStorage bằng một object tạm
        let store = {};
        global.localStorage = {
            setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
            getItem: jest.fn((key) => store[key] || null),
            removeItem: jest.fn((key) => { delete store[key]; }),
            clear: jest.fn(() => { store = {}; }),
            get length() { return Object.keys(store).length; },
            key: jest.fn((i) => Object.keys(store)[i])
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('10.2: Session Management', () => {
        test('nên tạo và lấy được session người dùng', () => {
            const user = { id: 1, name: 'Dũng Thế' };
            createSession(user);
            expect(getSession()).toEqual(user);
            expect(isSessionValid()).toBe(true);
        });

        test('nên hủy được session khi người dùng logout', () => {
            createSession({ id: 1 });
            destroySession();
            expect(getSession()).toBeNull();
            expect(isSessionValid()).toBe(false);
        });
    });
});