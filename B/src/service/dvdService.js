const TransactionManager = require('../dao/transactionManager');
const dvdDao = require('../dao/dvdDao');

class DvdService {
    constructor() {
        this.transactionManager = new TransactionManager();
        this.dao = new dvdDao(this.transactionManager);
    }

    async queryForDVDsByLocation(location) {
        await this.transactionManager.startTransaction();
        try {
            return await this.dao.queryForDVDsByLocation(location);
        }
        finally {
            await this.transactionManager.rollbackTransaction();
        }
    }
}

module.exports = DvdService;
