import { 
    parseQueryString, 
    buildQueryString, 
    tokenize, 
    parseTemplate 
} from '../src/bai14_2_string_parsing';

describe('Bài 14.2: String Parsing', () => {

    test('parseQueryString: nên parse đúng các tham số URL', () => {
        const url = 'https://example.com?search=javascript&page=2&active=true';
        expect(parseQueryString(url)).toEqual({
            search: 'javascript',
            page: '2',
            active: 'true'
        });
    });

    test('buildQueryString: nên tạo chuỗi query chính xác từ object', () => {
        const params = { q: 'react', limit: 10 };
        expect(buildQueryString(params)).toBe('?q=react&limit=10');
    });

    test('tokenize: nên phân tách số và toán tử chính xác', () => {
        const exp = '3.14 + (10 * 2) / 5';
        expect(tokenize(exp)).toEqual(['3.14', '+', '(', '10', '*', '2', ')', '/', '5']);
    });

    test('parseTemplate: nên render đúng dữ liệu vào template', () => {
        const template = 'Hello {{ name }}, you have {{ count }} notifications.';
        const data = { name: 'Dũng', count: 5 };
        expect(parseTemplate(template, data)).toBe('Hello Dũng, you have 5 notifications.');
    });

    test('parseTemplate: nên giữ nguyên tag nếu không tìm thấy key trong data', () => {
        const template = 'Hi {{ name }}';
        expect(parseTemplate(template, {})).toBe('Hi {{ name }}');
    });
});