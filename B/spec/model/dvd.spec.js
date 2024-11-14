const DVD = require("../../src/models/dvd");

describe('dvd', () => {
    it('is instantiated', () => {
        
        const dvd = new DVD('A DVD', 'PG-13', 'A Studio', 100, 10);
     
        expect(dvd.title).toBe('A DVD');
        expect(dvd.mpaa_rating).toBe('PG-13');
        expect(dvd.studio).toBe('A Studio');
        expect(dvd.time).toBe(100);
        expect(dvd.price).toBe(10);
    });
});