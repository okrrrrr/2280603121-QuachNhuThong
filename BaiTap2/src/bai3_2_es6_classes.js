/** Quản lý Sách */
export class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    getInfo() {
        return `${this.title} - ${this.author} (ISBN: ${this.isbn})`;
    }

    borrow() {
        if (!this.isAvailable) return false;
        this.isAvailable = false;
        return true;
    }

    returnBook() {
        this.isAvailable = true;
    }
}

/** Quản lý Thư viện */
export class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(isbn) {
        this.books = this.books.filter(b => b.isbn !== isbn);
    }

    findBook(title) {
        return this.books.find(b => b.title.toLowerCase().includes(title.toLowerCase()));
    }

    getAvailableBooks() {
        return this.books.filter(b => b.isAvailable);
    }
}

/** Quản lý Thành viên */
export class Member {
    constructor(name, memberId) {
        this.name = name;
        this.memberId = memberId;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (book.borrow()) {
            this.borrowedBooks.push(book);
            return true;
        }
        return false;
    }

    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index > -1) {
            book.returnBook();
            this.borrowedBooks.splice(index, 1);
            return true;
        }
        return false;
    }
}