const BookDao = require('../../src/dao/bookDao');
const TransactionManager = require('../../src/dao/transactionManager');
const dbUtils = require('../../src/dao/dbUtils');
const Book = require('../../src/models/book');

const book1 = new Book('Lord of Souls', 'Greg Keyes', 13, 345508025, 'Del Rey');
const book2 = new Book('Chronicles of Narnia', 'C. S. Lewis', 42, 64471195, 'HarperCollins');

describe('Product DAO integration tests for book CRUD operations:', () => {
    let bookDao;
    let transactionManager;

    beforeEach(async () => {
        console.log('Setting up test environment...');
        await initDb();
        transactionManager = new TransactionManager();
        bookDao = new BookDao(transactionManager);
        await transactionManager.startTransaction();
    });

    async function initDb() {
        const stmts = [
            "delete from books",
            "insert into books values ('Lord of Souls', 'Greg Keyes', 13, 0345508025, 'Del Rey')",
            "insert into books values ('Chronicles of Narnia', 'C. S. Lewis', 42, 0064471195, 'HarperCollins')",
        ];
        await dbUtils.executeDml(stmts);
    }

    describe('retrieve all books without location', () => {
        it('succeeds', async () => {
            console.log('Running test: retrieve all books');
            const allbooks = await bookDao.fetchAllBooksByLocation("IEE");
            await transactionManager.rollbackTransaction();
            const rowCount = await dbUtils.countRowsInTable('books');
            expect(allbooks.length).toEqual(rowCount);
        });
    });
    describe('fetch books by different us', () => {
        it('applies correct price adjustments', async () => {
            console.log('Running test: fetch books by different locations');
            const booksInUS = await bookDao.fetchAllBooksByLocation("US-NC");
            await transactionManager.rollbackTransaction();
            expect(booksInUS[0].price).toEqual((book1.price * 1.08).toFixed(2));
        });
        
    });
    describe('fetch books by ireland', () => {
        it('applies correct price adjustments', async () => {
            console.log('Running test: fetch books by different locations');
            const booksInIE = await bookDao.fetchAllBooksByLocation("IE");
            await transactionManager.rollbackTransaction();
            expect(booksInIE[0].price).toEqual((book1.price * 1.23).toFixed(2));
        });
    });
    describe('fetch books by india', () => {
        it('applies correct price adjustments', async () => {
            console.log('Running test: fetch books by different locations');
            const booksInIN = await bookDao.fetchAllBooksByLocation("IN");
            await transactionManager.rollbackTransaction();
            expect(booksInIN[0].price).toEqual((book1.price * 1.18).toFixed(2));
        });
    });
});