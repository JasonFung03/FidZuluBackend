
DROP TABLE Books;
DROP TABLE DVDs;

CREATE TABLE Books (
    Title	VARCHAR(512),
    Author	VARCHAR(512),
    price	DECIMAL,
    ISBN	INT PRIMARY KEY,
    publisher	VARCHAR(512)
);

INSERT INTO Books (Title, Author, price, ISBN, publisher) VALUES ('Lord of the Rings', 'J.R.R Tolkien', '25.99', '9780261102385', 'HarperCollins');
INSERT INTO Books (Title, Author, price, ISBN, publisher) VALUES ('The Hobbit', 'J.R.R Tolkien', '9.88', '0261102214', 'HarperCollins');
INSERT INTO Books (Title, Author, price, ISBN, publisher) VALUES ('Lord of Souls', 'Greg Keyes', '12.98', '0345508025', 'Del Rey');
INSERT INTO Books (Title, Author, price, ISBN, publisher) VALUES ('Chronicles of Narnia', 'C. S. Lewis', '41.77', '0064471195', 'HarperCollins');

CREATE TABLE DVDs (
    title	VARCHAR(512),
    mpaa_rating	VARCHAR(512),
    studio	VARCHAR(512),
    time	INT,
    price	DOUBLE
);

INSERT INTO DVDs (title, mpaa_rating, studio, time, price) VALUES ('Avengers - Infinity War', 'PG-13', 'MARVEL', '149', '18.55');
INSERT INTO DVDs (title, mpaa_rating, studio, time, price) VALUES ('Spider-Man Homecoming', '14 and over', 'Sony Pictures Home Entertainment', '133', '7.23');
INSERT INTO DVDs (title, mpaa_rating, studio, time, price) VALUES ('Ant-Man', 'PG-13', 'Walt Disney Video', '117', '19.98');
INSERT INTO DVDs (title, mpaa_rating, studio, time, price) VALUES ('Captain America', 'PG', 'Walt Disney Video', '123', '24.88');
