const dbUtils = require('../../src/dao/dbUtils');
const axios = require('axios');

const dvd1 = {
    "title": "Avengers - Infinity War",
    "mpaa_rating": "PG-13",
    "studio": "MARVEL",
    "time": 149,
    "price": 18.55
};

const dvd2 = {
    "title": "Spider-Man Homecoming",
    "mpaa_rating": "14 and over",
    "studio": "Sony Pictures Home Entertainment",
    "time": 133,
    "price": 7.23
}

const dvd3 = {
    "title": "Ant-Man",
    "mpaa_rating": "PG-13",
    "studio": "Walt Disney Video",
    "time": 117,
    "price": 19.98
}

const dvd4 = {
    "title": "Captain America",
    "mpaa_rating": "PG",
    "studio": "Walt Disney Video",
    "time": 123,
    "price": 24.88
}

const dvdsInDb = [dvd1, dvd2, dvd3, dvd4];

describe("RESTful controller integration tests for Dvd CRUD operations:", () => {
    const baseUrl = 'http://localhost:3034/dvds/all';

    beforeEach(async () => {
        await initDb();   // re-initialize the database before each spec
    });

    async function initDb() {
        const stmts = [
            "delete from dvds",
            "insert into dvds values ('Lord of the Rings', 'J.R.R Tolkien', 25.99, 9780261102385, 'HarperCollins')",
            "insert into dvds values ('The Hobbit', 'J.R.R Tolkien', 9.88, 0261102214, 'HarperCollins')",
            "insert into dvds values ('Lord of Souls', 'Greg Keyes', 12.98, 0345508025, 'Del Rey')",
            "insert into dvds values ('Chronicles of Narnia', 'C. S. Lewis', 41.77, 0064471195, 'HarperCollins')",
        ];
        await dbUtils.executeDml(stmts);
    }
    
    describe("retrieve all dvds by location", () => {
        it("succeeds for location IN", async () => {
            const location = 'IN';
            const adjustedDvds = dvdsInDb.map(dvd => ({
                ...dvd,
                price: (dvd.price * 1.18).toFixed(2)
            }));

            const response = await axios.get(`${baseUrl}/${location}`);
        
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.location).toEqual(location);
            expect(response.data.dvds).toEqual(adjustedDvds);            
        });

        it("succeeds for location IE", async () => {
            const location = 'IE';
            const adjustedDvds = dvdsInDb.map(dvd => ({
                ...dvd,
                price: (dvd.price * 1.23).toFixed(2)
            }));

            const response = await axios.get(`${baseUrl}/${location}`);
        
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.location).toEqual(location);
            expect(response.data.dvds).toEqual(adjustedDvds);         
        });

        it("succeeds for location US-NC", async () => {
            const location = 'US-NC';
            const adjustedDvds = dvdsInDb.map(dvd => ({
                ...dvd,
                price: (dvd.price * 1.08).toFixed(2)
            }));

            const response = await axios.get(`${baseUrl}/${location}`);
        
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.location).toEqual(location);
            expect(response.data.dvds).toEqual(adjustedDvds);            
        });

        it("fails due to an invalid location", async () => {
            const location = 'Invalid Location';
            try {
                await axios.get(`${baseUrl}/${location}`);
                fail('GET with invalid location should have failed');
            } catch (err) {
                expect(err.response.status).toEqual(500);
            }
        });
    });
});