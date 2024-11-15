const DvdService = require('../../src/service/dvdService');
const dbUtils = require('../../src/dao/dbUtils');
const DVD = require('../../src/models/dvd')

const dvd1 = new DVD('Avengers - Infinity War', 'PG-13', 'MARVEL', 149, 19);
const dvd2 = new DVD('Spider-Man Homecoming', '14 and over', 'Sony Pictures Home Entertainment', 133, 7);
const dvd3 = new DVD('Ant-Man', 'PG-13', 'Walt Disney Video', 117, 20);
const dvd4 = new DVD('Captain America', 'PG', 'Walt Disney Video', 123, 25);

const dvdsInDb = [dvd3, dvd4, dvd1, dvd2];

describe('DvdService integration tests for DVD operations:', () => {
    let dvdService;

    beforeEach(async () => {
        await initDb();
        dvdService = new DvdService();
    });

    async function initDb() {
        const stmts = [
            "DELETE FROM DVD",
            "INSERT INTO DVD VALUES ('Avengers - Infinity War', 'PG-13', 'MARVEL', '149', '19')",
            "INSERT INTO DVD VALUES ('Spider-Man Homecoming', '14 and over', 'Sony Pictures Home Entertainment', '133', '7')",
            "INSERT INTO DVD VALUES ('Ant-Man', 'PG-13', 'Walt Disney Video', '117', '20')",
            "INSERT INTO DVD VALUES ('Captain America', 'PG', 'Walt Disney Video', '123', '25')"
        ];
        await dbUtils.executeDml(stmts);
    }
    
    describe('retrieve all dvds', () => {
        it('succeeds', async () => {
            const allDVDs = await dvdService.queryForDVDsByLocation("IE");
            const rowCount = await dbUtils.countRowsInTable('dvd');
            expect(allDVDs.length).toEqual(rowCount);
        });
    });
});