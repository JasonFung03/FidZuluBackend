const dbUtils = require('./dbUtils');
const DVD = require('../models/dvd');

class DvdDao {

    constructor(connectionProvider) {  
        this.connectionProvider = connectionProvider;
    }

    async queryForDVDsByLocation(location) {
        const sql = `
            SELECT title, mpaa_rating, studio, time, price 
            FROM DVD
        `;

        const dvds = [];
        const result = await this.connectionProvider.connection.execute(sql, {}, dbUtils.executeOpts);
        const rs = result.resultSet;
        let row;
        while ((row = await rs.getRow())) {
            console.log(row)
            var newPrice = row.PRICE;
            if (location == "US-NC") {
                newPrice = row.PRICE * 1.08;
            } else if (location == "IE") {
                newPrice = row.PRICE * 1.23;
            } else if (location == "IN") {
                newPrice = row.PRICE * 1.18;
            }
            const dvd = new DVD(row.TITLE, row.MPAA_RATING, row.STUDIO, row.TIME, newPrice.toFixed(2));
            dvds.push(dvd);
        }
        await rs.close();
        return dvds;
    }
}
module.exports = DvdDao