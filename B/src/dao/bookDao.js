const dbUtils = require('./dbUtils');
const Book = require('../models/book');

class BookDao {
    constructor(connectionProvider) {  
        this.connectionProvider = connectionProvider;
    }

    async fetchAllBooksByLocation(location) {
        const sql = `
            SELECT title, author, price, isbn, publisher
            FROM BOOKS
        `;
        const books = [];
        const result = await this.connectionProvider.connection.execute(sql, {}, dbUtils.executeOpts);
        const rs = result.resultSet;
        let row;
        while ((row = await rs.getRow())) {
            var newPrice = row.PRICE;
            if (location == "US-NC") {
                newPrice = row.PRICE * 1.08;
            } else if (location == "IE") {
                newPrice = row.PRICE * 1.23;
            } else if (location == "IN") {
                newPrice = row.PRICE * 1.18;
            }
            const book = new Book(row.TITLE, row.AUTHOR, newPrice.toFixed(2),  
                                      row.ISBN, row.PUBLISHER);
            books.push(book);
        }
        await rs.close();
        return books;
    }
}

module.exports = BookDao;