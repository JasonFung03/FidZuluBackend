class Book {
    constructor(title, author, price, isbn, publisher) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.isbn = isbn;
        this.publisher = publisher;
    }

    toString() {
        JSON.stringify(this);
    }
}

module.exports = Book
