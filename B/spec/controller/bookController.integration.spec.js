const dbUtils = require('../../src/dao/dbUtils');
const axios = require('axios');

/* 
    Database initialization:
    delete from books;
    insert into books values ('Lord of the Rings', 'J.R.R Tolkien', 25.99, '9780261102385', 'HarperCollins');
    insert into books values ('The Hobbit', 'J.R.R Tolkien', 9.88, '0261102214', 'HarperCollins');
    insert into books values ('Lord of Souls', 'Greg Keyes', 12.98, '0345508025', 'Del Rey');
    insert into books values ('Chronicles of Narnia', 'C. S. Lewis', 41.77, '0064471195', 'HarperCollins');
    commit;
    select * from books order by isbn;
 */

const book1 = {title: 'Lord of the Rings', author: 'J.R.R Tolkien', price: 26, isbn: 9780261102385, publisher: 'HarperCollins'};
const book2 = {title: 'The Hobbit', author: 'J.R.R Tolkien', price: 10, isbn: 261102214, publisher: 'HarperCollins'};
const book3 = {title: 'Lord of Souls', author: 'Greg Keyes', price: 13, isbn: 345508025, publisher: 'Del Rey'};
const book4 = {title: 'Chronicles of Narnia', author: 'C. S. Lewis', price: 42, isbn: 64471195, publisher: 'HarperCollins'};

const booksInDb = [book3, book4, book1, book2];

describe("RESTful controller integration tests for Book CRUD operations:", () => {
    const baseUrl = 'http://localhost:3034/books/all';

    beforeEach(async () => {
        await initDb();
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
    
    describe("retrieve all books by location", () => {
        it("succeeds for location IN", async () => {
            const location = 'IN';
            const adjustedBooks = booksInDb.map(book => ({
                ...book,
                price: (book.price * 1.18).toFixed(2)
            }));

            const response = await axios.get(`${baseUrl}/${location}`);
        
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.location).toEqual(location);
            expect(response.data.books).toEqual(adjustedBooks);            
        });

        it("succeeds for location IE", async () => {
            const location = 'IE';
            const adjustedBooks = booksInDb.map(book => ({
                ...book,
                price: (book.price * 1.23).toFixed(2)
            }));

            const response = await axios.get(`${baseUrl}/${location}`);
        
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.location).toEqual(location);
            expect(response.data.books).toEqual(adjustedBooks);            
        });

        it("succeeds for location US-NC", async () => {
            const location = 'US-NC';
            const adjustedBooks = booksInDb.map(book => ({
                ...book,
                price: (book.price * 1.08).toFixed(2)
            }));

            const response = await axios.get(`${baseUrl}/${location}`);
        
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.location).toEqual(location);
            expect(response.data.books).toEqual(adjustedBooks);            
        });

        it("fails due to an invalid location", async () => {
            const location = 'Invalid Location';
            try {
                await axios.get(`${baseUrl}/${location}`);
            } catch (err) {
                expect(err.response.status).toEqual(500);
            }
        });
    });
});