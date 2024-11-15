const DvdDao = require('../../src/dao/dvdDao');
const TransactionManager = require('../../src/dao/transactionManager');
const dbUtils = require('../../src/dao/dbUtils');
const Dvd = require('../../src/models/dvd');

const dvd1 = new Dvd('Avengers - Infinity War', 'PG-13', 'MARVEL', 149, 19);
const dvd2 = new Dvd('Spider-Man Homecoming', '14 and over', 'Sony Pictures Home Entertainment', 133, 7);
const dvd3 = new Dvd('Ant-Man', 'PG-13', 'Walt Disney Video', 117, 20);
const dvd4 = new Dvd('Captain America', 'PG', 'Walt Disney Video', 123, 25);

const dvdsInDb = [dvd1, dvd2, dvd3, dvd4];

describe('DAO integration tests for dvd CRUD operations:', () => {
    let dvdDao;
    let transactionManager;

    beforeEach(async () => {
        console.log('Setting up test environment...');
        await initDb();
        transactionManager = new TransactionManager();
        dvdDao = new DvdDao(transactionManager);
        await transactionManager.startTransaction();
    });

    async function initDb() {
        const stmts = [
            "delete from dvd",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Avengers - Infinity War', 'PG-13', 'MARVEL', 149, 18.55)",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Spider-Man Homecoming', '14 and over', 'Sony Pictures Home Entertainment', 133, 7.23)",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Ant-Man', 'PG-13', 'Walt Disney Video', 117, 19.98)",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Captain America', 'PG', 'Walt Disney Video', 123, 24.88)"
        ];
        await dbUtils.executeDml(stmts);
    }

    describe('retrieve all dvds without location', () => {
        it('succeeds', async () => {
            console.log('Running test: retrieve all dvds');
            const alldvds = await dvdDao.queryForDVDsByLocation("IE");
            await transactionManager.rollbackTransaction();
            const rowCount = await dbUtils.countRowsInTable('dvd');
            expect(alldvds.length).toEqual(rowCount);
        });
    });
    describe('fetch dvds by different US locations', () => {
        it('applies correct price adjustments', async () => {
            console.log('Running test: fetch dvds by different locations');
            const dvdsInUS = await dvdDao.queryForDVDsByLocation("US-NC");
            await transactionManager.rollbackTransaction();
            expect(dvdsInUS[0].price).toEqual((dvd3.price * 1.08).toFixed(2));
        });
    });
    
    describe('fetch dvds by Ireland', () => {
        it('applies correct price adjustments', async () => {
            console.log('Running test: fetch dvds by different locations');
            const dvdsInIE = await dvdDao.queryForDVDsByLocation("IE");
            await transactionManager.rollbackTransaction();
            expect(dvdsInIE[0].price).toEqual((dvd3.price * 1.23).toFixed(2));
        });
    });
    
    describe('fetch dvds by India', () => {
        it('applies correct price adjustments', async () => {
            console.log('Running test: fetch dvds by different locations');
            const dvdsInIN = await dvdDao.queryForDVDsByLocation("IN");
            await transactionManager.rollbackTransaction();
            expect(dvdsInIN[0].price).toEqual((dvd3.price * 1.18).toFixed(2));
        });
    });
});