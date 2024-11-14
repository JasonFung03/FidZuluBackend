const dbUtils = require('./db-utils');
const DVD = require('../model/DVD');

class dvdDao {

    constructor(connectionProvider) {  
        this.connectionProvider = connectionProvider;
    }

    async queryForDVDsByLocation(location) {
        const sql = `
            select title, mpaa_rating, studio, time, price 
            from DVDs
        `;

        const result = await this.connectionProvider.connection.execute(sql, [id], dbUtils.executeOpts);

        const rs = result.resultSet;
        let row = await rs.getRow();
        if (row) {

            let locationPrice = row.PRICE;

            if(location = "IE") {
                locationPrice = row.PRICE * 1.08;
            }
            if(location = "US-NC") {
                locationPrice = row.PRICE * 1.23;
            }
            if(location = "IN") {
                locationPrice = row.PRICE * 1.18;
            }

            const dvd = new DVD(row.TITLE, row.MPAA_RATING, row.STUDIO, row.TIME, locationPrice);
            return dvd;
        }
        await rs.close();
    }
}
module.exports = dvdDao