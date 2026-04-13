import { StorageManager } from '../src/bai10_1_localstorage_wrapper';

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

    describe('10.1: StorageManager (Coverage Extension)', () => {
        
        test('remove nên xóa đúng key chỉ định', () => {
            StorageManager.set('testKey', 'value');
            StorageManager.remove('testKey');
            expect(StorageManager.get('testKey')).toBeNull();
            expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
        });

        test('clear nên xóa toàn bộ dữ liệu trong storage', () => {
            StorageManager.set('a', 1);
            StorageManager.set('b', 2);
            StorageManager.clear();
            
            expect(localStorage.clear).toHaveBeenCalled();
            expect(localStorage.length).toBe(0);
        });

        test('getAll nên lấy toàn bộ dữ liệu hiện có dưới dạng object', () => {
            // Reset storage giả lập trước khi test getAll
            StorageManager.clear(); 
            
            const items = {
                user: { name: 'Dũng' },
                theme: 'light'
            };
            
            StorageManager.set('user', items.user);
            StorageManager.set('theme', items.theme);
            
            const allData = StorageManager.getAll();
            
            expect(allData).toEqual(items);
            expect(Object.keys(allData)).toContain('user');
            expect(Object.keys(allData)).toContain('theme');
        });

        test('get nên trả về null nếu key không tồn tại', () => {
            expect(StorageManager.get('nonExistent')).toBeNull();
        });
    });

});