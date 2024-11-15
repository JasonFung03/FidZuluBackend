const express = require('express');
const TransactionManager = require('../dao/transactionManager')
const BookService = require('../service/bookService');

class BookController {
    constructor() {
        this.port = process.env.PORT || 3034;

        this.app = express();
        this.app.use(express.json());

        const router = express.Router();
        router.get('/books/all/:location', this.getAllBooksByLocation.bind(this));
        router.get('/books/team', this.getTeam.bind(this));

        this.app.use('/', router);

        this.transactionManager = new TransactionManager();
        this.bookService = new BookService();
    }

    start() {
        this.app.listen(this.port, 
            () => console.log(`Books service running on port ${this.port}`))
    }

    async getAllBooksByLocation(req, res) {
        const location = req.params.location;

        try {
            await this.transactionManager.startTransaction();
 
            const books = await this.bookService.fetchAllBooksByLocation(location.toLocaleUpperCase());

            res.json(books);
        } catch (err) {
            console.error(`error on GET books for location ${location}: ${err}`)
            res.status(500).json({error: err});
        } finally {
            await this.rollbackTransaction();
        }
    }

    getTeam(req, res) {
        res.json({
            team: "Group 6 Team",
            members: ["Benji", "Jason", "Bartek"]
        });
    }

    async rollbackTransaction() {
        try {
            await this.transactionManager.rollbackTransaction();
        } catch (err) {
            console.error(`error on rollback: ${err}`)
        }
    }
}

module.exports = BookController;

if (require.main === module) {
    const service = new BookController();
    service.start();
}