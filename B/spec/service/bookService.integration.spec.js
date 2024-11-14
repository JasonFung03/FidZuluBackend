const BookService = require('../../src/service/bookService');
const dbUtils = require('../../src/dao/dbUtils');
const Book = require('../../src/models/book');


const book1 = new Book('Lord of Souls', 'Greg Keyes', 13, 345508025, 'Del Rey');
const book2 = new Book('Chronicles of Narnia', 'C. S. Lewis', 42, 64471195, 'HarperCollins');
const book3 = new Book('Lord of the Rings', 'J.R.R Tolkien', 26, 9780261102385, 'HarperCollins');
const book4 = new Book('The Hobbit', 'J.R.R Tolkien', 10, '0261102214', 'HarperCollins');

const booksInDb = [book1, book2, book3,book4];

describe('Business service integration tests for Widget CRUD operations:', () => {
    let bookService;

    beforeEach(async () => {
        await initDb();
        bookService = new BookService();
    });

    async function initDb() {
        const stmts = [
            "delete from books",
            "insert into books values ('Lord of the Rings', 'J.R.R Tolkien', 26, 9780261102385, 'HarperCollins')",
            "insert into books values ('The Hobbit', 'J.R.R Tolkien', 10, 0261102214, 'HarperCollins')",
            "insert into books values ('Lord of Souls', 'Greg Keyes', 13, 0345508025, 'Del Rey')",
            "insert into books values ('Chronicles of Narnia', 'C. S. Lewis', 42, 0064471195, 'HarperCollins')",
        ];
        await dbUtils.executeDml(stmts);
    }
    
    describe('retrieve all books', () => {
        it('succeeds', async () => {
            const allBooks = await bookService.fetchAllBooksByLocation("IE");
            const rowCount = await dbUtils.countRowsInTable('books');
            expect(allBooks.length).toEqual(rowCount);
        });
    });
});