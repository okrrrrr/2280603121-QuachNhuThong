import { asyncFetchUser, parallelFetch } from '../src/bai4_3_async_await';

describe('Phần 4: Asynchronous Programming', () => {
    test('4.3: asyncFetchUser nên bắt lỗi chính xác', async () => {
        await expect(asyncFetchUser(0)).rejects.toBe('User không tồn tại');
    });

    test('4.3: parallelFetch nên trả về mảng kết quả', async () => {
        const urls = ['url1', 'url2'];
        const results = await parallelFetch(urls);
        expect(results).toEqual(['Data from url1', 'Data from url2']);
    });
});