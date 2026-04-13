const cryptoUtils = require('../src/bai10_1_crypto_utilities');

describe('Crypto Utilities Module', () => {
    test('hash should return correct hex string', () => {
        const md5 = cryptoUtils.hash('hello', 'md5');
        expect(md5).toBe('5d41402abc4b2a76b9719d911017c592');
    });

    test('hashPassword and verifyPassword should work together', () => {
        const pass = 'secret123';
        const stored = cryptoUtils.hashPassword(pass);
        expect(cryptoUtils.verifyPassword(pass, stored)).toBe(true);
        expect(cryptoUtils.verifyPassword('wrong', stored)).toBe(false);
    });

    test('encrypt and decrypt should work with 32-byte key', () => {
        const key = 'a'.repeat(64); 
        const text = 'sensitive data';
        const encrypted = cryptoUtils.encrypt(text, key);
        const decrypted = cryptoUtils.decrypt(encrypted, key);
        expect(decrypted).toBe(text);
    });

    test('generateUUID should return a valid UUID', () => {
        const uuid = cryptoUtils.generateUUID();
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
});
