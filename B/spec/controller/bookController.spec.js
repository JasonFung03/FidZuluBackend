const BookController = require('../../src/controllers/bookController');
const BookService = require('../../src/service/bookService');

console.error = arg => {}

const testBooks = [
    {
        "title": "Lord of the Rings",
        "author": "J.R.R Tolkien",
        "price": 25.99,
        "isbn": "9780261102385",
        "publisher": "HarperCollins"
    },
    {
        "title": "The Hobbit",
        "author": "J.R.R Tolkien",
        "price": 9.88,
        "isbn": "0261102214",
        "publisher": "HarperCollins"
    },
    {
        "title": "Lord of Souls",
        "author": "Greg Keyes",
        "price": 12.98,
        "isbn": "0345508025",
        "publisher": "Del Rey"
    },
    {
        "title": "Chronicles of Narnia",
        "author": "C. S. Lewis",
        "price": 41.77,
        "isbn": "0064471195",
        "publisher": "HarperCollins"
    }
];

describe('RESTful controller unit tests for Book:', () => {
    let controller;
    let mockService;
    let mockHttpResponse;

    beforeEach(() => {
        mockService = jasmine.createSpyObj('mockService', ['fetchAllBooksByLocation']);

        controller = new BookController();
        controller.bookService = mockService;

        mockHttpResponse = jasmine.createSpyObj('mockHttpResponse', ['status', 'json']);

        mockHttpResponse.status.and.returnValue(mockHttpResponse);
    });

    describe('retrieve all books by location', () => {
        it('succeeds for location IN', async () => {
            const location = 'IN';
            const adjustedBooks = testBooks.map(book => ({
                ...book,
                price: (book.price * 1.18).toFixed(2)
            }));
            mockService.fetchAllBooksByLocation.and.returnValue(Promise.resolve(adjustedBooks));
            const req = { params: { location } };

            await controller.getAllBooksByLocation(req, mockHttpResponse);
        
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith({
                location,
                books: adjustedBooks
            });
        });

        it('succeeds for location IE', async () => {
            const location = 'IE';
            const adjustedBooks = testBooks.map(book => ({
                ...book,
                price: (book.price * 1.23).toFixed(2)
            }));
            mockService.fetchAllBooksByLocation.and.returnValue(Promise.resolve(adjustedBooks));
            const req = { params: { location } };

            await controller.getAllBooksByLocation(req, mockHttpResponse);
        
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith({
                location,
                books: adjustedBooks
            });
        });

        it('succeeds for location US-NC', async () => {
            const location = 'US-NC';
            const adjustedBooks = testBooks.map(book => ({
                ...book,
                price: (book.price * 1.08).toFixed(2)
            }));
            mockService.fetchAllBooksByLocation.and.returnValue(Promise.resolve(adjustedBooks));
            const req = { params: { location } };

            await controller.getAllBooksByLocation(req, mockHttpResponse);
        
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith({
                location,
                books: adjustedBooks
            });
        });

        it('fails due to a service exception', async () => {
            mockService.fetchAllBooksByLocation.and.throwError('error');
            const req = { params: { location: 'IN' } };

            await controller.getAllBooksByLocation(req, mockHttpResponse);
                
            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });

});