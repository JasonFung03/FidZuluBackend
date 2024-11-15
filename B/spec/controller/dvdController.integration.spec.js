const dbUtils = require('../../src/dao/dbUtils');
const axios = require('axios');

const dvd1 = {
    "title": "Avengers - Infinity War",
    "mpaa_rating": "PG-13",
    "studio": "MARVEL",
    "time": 149,
    "price": 19
};

const dvd2 = {
    "title": "Spider-Man Homecoming",
    "mpaa_rating": "14 and over",
    "studio": "Sony Pictures Home Entertainment",
    "time": 133,
    "price": 7
}

const dvd3 = {
    "title": "Ant-Man",
    "mpaa_rating": "PG-13",
    "studio": "Walt Disney Video",
    "time": 117,
    "price": 20
}

const dvd4 = {
    "title": "Captain America",
    "mpaa_rating": "PG",
    "studio": "Walt Disney Video",
    "time": 123,
    "price": 25
}

const dvdsInDb = [dvd3, dvd4, dvd1, dvd2];

describe("RESTful controller integration tests for Dvd CRUD operations:", () => {
    const baseUrl = 'http://localhost:3035/dvds/all';

    beforeEach(async () => {
        await initDb();   // re-initialize the database before each spec
    });

    async function initDb() {
        const stmts = [
            "delete from DVD",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Avengers - Infinity War', 'PG-13', 'MARVEL', '149', '19')",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Spider-Man Homecoming', '14 and over', 'Sony Pictures Home Entertainment', '133', '7')",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Ant-Man', 'PG-13', 'Walt Disney Video', '117', '20')",
            "INSERT INTO DVD (Title, Mpaa_rating, Studio, Time, price) VALUES ('Captain America', 'PG', 'Walt Disney Video', '123', '25')"
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

            console.log(response.data)
        
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
            } catch (err) {
                expect(err.response.status).toEqual(500);
            }
        });
    });
});