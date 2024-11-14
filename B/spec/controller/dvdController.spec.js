const DVDController = require('../../src/controllers/DVDController');
const DvdService = require('../../src/service/dvdService');

console.error = arg => {};

const testDVDs = [
    {
        "title": "Avengers - Infinity War",
        "mpaa_rating": "PG-13",
        "studio": "MARVEL",
        "time": 149,
        "price": 18.55
    },
    {
        "title": "Spider-Man Homecoming",
        "mpaa_rating": "14 and over",
        "studio": "Sony Pictures Home Entertainment",
        "time": 133,
        "price": 7.23
    },
    {
        "title": "Ant-Man",
        "mpaa_rating": "PG-13",
        "studio": "Walt Disney Video",
        "time": 117,
        "price": 19.98
    },
    {
        "title": "Captain America",
        "mpaa_rating": "PG",
        "studio": "Walt Disney Video",
        "time": 123,
        "price": 24.88
    }

];

describe('RESTful controller unit tests for DVD:', () => {
    let controller;
    let mockService;
    let mockHttpResponse;
    let mockTransactionManager;

    beforeEach(() => {
        mockService = jasmine.createSpyObj('mockService', ['queryForDVDsByLocation']);
        mockTransactionManager = jasmine.createSpyObj('mockTransactionManager', ['startTransaction', 'rollbackTransaction']);

        controller = new DVDController();
        controller.dvdService = mockService;
        controller.transactionManager = mockTransactionManager;

        mockHttpResponse = jasmine.createSpyObj('mockHttpResponse', ['status', 'json']);
        mockHttpResponse.status.and.returnValue(mockHttpResponse);
    });

    describe('retrieve all DVDs by location', () => {
        it('succeeds for location NYC', async () => {
            const location = 'NYC';
            mockService.queryForDVDsByLocation.and.returnValue(Promise.resolve(testDVDs));
            const req = { params: { location } };

            await controller.getAllDVDsByLocation(req, mockHttpResponse);

            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith({
                location,
                dvds: testDVDs
            });
        });

        it('fails due to a service exception', async () => {
            mockService.queryForDVDsByLocation.and.throwError('error');
            const req = { params: { location: 'NYC' } };

            await controller.getAllDVDsByLocation(req, mockHttpResponse);

            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith({ error: 'error' });
        });
    });

    describe('retrieve team information', () => {
        it('succeeds', () => {
            const req = {};
            const expectedResponse = {
                team: "Group 6 Team",
                members: ["Benji", "Jason", "Bartek"]
            };

            controller.getTeam(req, mockHttpResponse);

            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(expectedResponse);
        });
    });
});
