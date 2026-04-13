const tokenManager = require('../src/bai10_2_token_manager');

describe('Token Manager Module', () => {
    const secret = 'my-secret-key';
    const payload = { userId: 1, role: 'admin' };

    test('should generate and verify a token', () => {
        const token = tokenManager.generateToken(payload, secret);
        const verified = tokenManager.verifyToken(token, secret);
        expect(verified.userId).toBe(1);
        expect(verified.role).toBe('admin');
    });

    test('should return null for invalid signature', () => {
        const token = tokenManager.generateToken(payload, secret);
        const invalidToken = token + 'manipulated';
        expect(tokenManager.verifyToken(invalidToken, secret)).toBeNull();
    });

    test('should detect expired token', async () => {
        const token = tokenManager.generateToken(payload, secret, { expiresIn: -1 });
        expect(tokenManager.isExpired(token)).toBe(true);
        expect(tokenManager.verifyToken(token, secret)).toBeNull();
    });

    test('decodeToken should work without secret', () => {
        const token = tokenManager.generateToken(payload, secret);
        const decoded = tokenManager.decodeToken(token);
        expect(decoded.userId).toBe(1);
    });
});
