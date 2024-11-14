const Book = require("../../src/models/book");

describe('book', () => {
    it('is instantiated', () => {
             
        const book = new Book('A Book', 'Some Author', 10, 100, 'Publisher');
     
        expect(book.title).toBe('A Book');
        expect(book.author).toBe('Some Author');
        expect(book.price).toBe(10);
        expect(book.isbn).toBe(100);
        expect(book.publisher).toBe('Publisher');
    });
});