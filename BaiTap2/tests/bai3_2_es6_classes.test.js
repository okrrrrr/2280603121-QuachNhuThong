import { Book, Library, Member } from '../src/bai3_2_es6_classes';

describe('Bài 3.2: ES6 Classes (Library System)', () => {
    test('Library nên thêm và tìm được sách', () => {
        const lib = new Library('Thư viện Trung tâm');
        const b1 = new Book('JS Nâng Cao', 'The Dung', '123');
        lib.addBook(b1);
        expect(lib.findBook('JS')).toBe(b1);
    });

    test('Member có thể mượn và trả sách', () => {
        const b = new Book('Clean Code', 'Uncle Bob', '456');
        const m = new Member('Dũng', 'M001');
        
        expect(m.borrowBook(b)).toBe(true);
        expect(b.isAvailable).toBe(false);
        expect(m.borrowedBooks.length).toBe(1);
        
        m.returnBook(b);
        expect(b.isAvailable).toBe(true);
        expect(m.borrowedBooks.length).toBe(0);
    });
});