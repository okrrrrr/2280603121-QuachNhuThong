const Router = require('../src/bai8_2_router_module');

describe('Router Module', () => {
    let router;

    beforeEach(() => {
        router = new Router();
    });

    test('should match simple route', () => {
        const handler = jest.fn();
        router.get('/users', handler);
        const matched = router.match('GET', '/users');
        expect(matched).not.toBeNull();
        expect(matched.path).toBe('/users');
    });

    test('should match route with params', () => {
        const handler = jest.fn();
        router.get('/users/:id', handler);
        const matched = router.match('GET', '/users/123');
        expect(matched).not.toBeNull();
        expect(matched.params.id).toBe('123');
    });

    test('should run middleware', async () => {
        const middleware = jest.fn((req, res, next) => next());
        const handler = jest.fn();
        router.use(middleware);
        router.get('/test', handler);

        const req = { method: 'GET', url: '/test' };
        const res = {};
        await router.handle(req, res);

        expect(middleware).toHaveBeenCalled();
        expect(handler).toHaveBeenCalled();
    });
});
