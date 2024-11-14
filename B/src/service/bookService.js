const TransactionManager = require('../dao/transactionManager');
const BookDao = require('../dao/bookDao');

class BookService {
    constructor() {
        this.transactionManager = new TransactionManager();
        this.dao = new BookDao(this.transactionManager);
    }

    async fetchAllBooksByLocation(location) {
        await this.transactionManager.startTransaction();
        try {
            return await this.dao.fetchAllBooksByLocation(location);
        }
        finally {
            await this.transactionManager.rollbackTransaction();
        }
    }
}

module.exports = BookService;
