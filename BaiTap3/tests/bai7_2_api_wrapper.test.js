const apiWrapper = require('../src/bai7_2_api_wrapper');
const httpClient = require('../src/bai7_1_http_client');

jest.mock('../src/bai7_1_http_client');

describe('API Wrapper Module', () => {
    test('getUsers should call httpClient.get with correct URL', async () => {
        httpClient.get.mockResolvedValue({ data: [{ id: 1, name: 'John' }] });
        const users = await apiWrapper.getUsers();
        expect(users[0].name).toBe('John');
        expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('/users'));
    });

    test('createPost should call httpClient.post', async () => {
        httpClient.post.mockResolvedValue({ data: { id: 101, title: 'test' } });
        const post = await apiWrapper.createPost({ title: 'test' });
        expect(post.id).toBe(101);
    });
});
