const LRUCache = require('../src/bai11_3_lru_cache');

describe('LRU Cache Module', () => {
    let lru;

    beforeEach(() => {
        lru = new LRUCache(3);
    });

    test('should store and retrieve values', () => {
        lru.put('a', 1);
        expect(lru.get('a')).toBe(1);
    });

    test('should evict least recently used', () => {
        lru.put('a', 1);
        lru.put('b', 2);
        lru.put('c', 3);
        lru.put('d', 4); 

        expect(lru.get('a')).toBeUndefined();
        expect(lru.get('b')).toBe(2);
        expect(lru.get('c')).toBe(3);
        expect(lru.get('d')).toBe(4);
    });

    test('get should refresh usage', () => {
        lru.put('a', 1);
        lru.put('b', 2);
        lru.put('c', 3);
        lru.get('a'); 
        lru.put('d', 4); 

        expect(lru.get('b')).toBeUndefined();
        expect(lru.get('a')).toBe(1);
    });
});
