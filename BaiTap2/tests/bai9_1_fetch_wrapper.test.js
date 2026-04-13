import { HttpClient } from '../src/bai9_1_fetch_wrapper';

describe('Bài 9.1: Fetch Wrapper (HttpClient)', () => {
    
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('get() nên thực hiện đúng method GET và parse JSON', async () => {
        const mockData = { id: 1, title: 'Test Post' };

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await HttpClient.get('https://api.test.com/data');
        
        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.test.com/data',
            expect.objectContaining({ method: 'GET' })
        );
    });

    test('post() nên gửi đúng dữ liệu body và headers', async () => {
        const postData = { name: 'Dũng' };
        
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        });

        await HttpClient.post('https://api.test.com/users', postData);
        
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.test.com/users',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(postData),
                headers: expect.objectContaining({
                    'Content-Type': 'application/json'
                })
            })
        );
    });

    test('nên quăng lỗi (throw error) khi response.ok là false', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        });

        await expect(HttpClient.get('https://api.test.com/404'))
            .rejects.toThrow('HTTP Error: 404');
    });
});