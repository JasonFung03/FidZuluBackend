const axios = require('axios');
const dbUtils = require('../../src/dao/db-utils');

const bikes = require('../testjson/Bikejson.json');
const fs = require('fs');
function applyMultiplier(bikes, location) {
    let multiplier;
    switch(location){
        case 'IE':
            multiplier = 1.23;
            break;
        case 'US-NC':
            multiplier = 1.08;
            break;
        case 'IN':
            multiplier = 1.18;
            break;
        default:
            throw Error("Invalid location " + loc);
    }
    return bikes.map(bike => ({
        ...bike,
        price: parseFloat((parseFloat(bike.price) * multiplier).toFixed(2))
    }));
}
describe("RESTful controller integration tests for Bikes", () => {
    const url = 'http://localhost:3031/bikes/all/';
    const location = 'IE'
    let baseUrl = ''
    beforeEach(async () => {
        await initDb();
        baseUrl = url + location;
    })

    async function initDb(){
        const stmts = [
            "delete from bike",
            "INSERT INTO bike VALUES ('Mamba Sport 12\" Balance Bike', 'Mamba Bikes', 'black', '75.88')",
            "INSERT INTO bike VALUES ('Kobe Aluminum Balance', 'Kobe', 'blue', '88.56')",
            "INSERT INTO bike VALUES ('Pomona Men\s Cruiser Bike', 'Northwoods', 'silver', '221.36')",
            "INSERT INTO bike VALUES ('DJ Fat Bike 500W', 'DJ Bikes', 'grey', '1599.86')"
        ];
        await dbUtils.executeDml(stmts);
    }

    describe("retrieve all bikes",() => {
        it("succeeds", async () => {
            const rowCount = await dbUtils.countRowsInTable('bike');

            const response = await axios.get(baseUrl);
            const expectedBikes = applyMultiplier(bikes, location);
            expect(response.status).toBe(200);
            expect(response.data).toBeTruthy();
            expect(response.data.length).toEqual(rowCount);
            expect(response.data).toEqual(expectedBikes);
        })

        it("fails", async () => {
            const rowCount = await dbUtils.countRowsInTable('bike');
            const response = null;
            try{
                response = await axios.get('http://localhost:3031/bikes/all/abc');
            }catch(axiosError){
                expect(axiosError.response.status).toBe(500);
                expect(response).toBeFalsy();

            }
        })
    })
})