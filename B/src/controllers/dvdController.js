const express = require('express');
const TransactionManager = require('../dao/transactionManager')
const DVDService = require('../service/dvdService');

class DVDController {
    constructor() {
        this.port = process.env.PORT || 3034;

        this.app = express();
        this.app.use(express.json());

        const router = express.Router();
        router.get('/dvds/all/:location', this.getAllDVDsByLocation.bind(this));
        router.get('/dvds/team', this.getTeam.bind(this));

        this.app.use('/', router);

        this.transactionManager = new TransactionManager();
        this.dvdService = new DVDService();
    }

    start() {
        this.app.listen(this.port, 
            () => console.log(`DVDs service running on port ${this.port}`))
    }

    async getAllDVDsByLocation(req, res) {
        const location = req.params.location;

        try {
            await this.transactionManager.startTransaction();
 
            const dvds = await this.dvdService.fetchAllDVDsByLocation(location.toLocaleUpperCase());
            const response = {
                location: location,
                dvds: dvds
            };
            
            res.json(response);
        } catch (err) {
            console.error(`error on GET dvds for location ${location}: ${err}`)
            res.status(500).json({error: err});
        } finally {
            await this.rollbackTransaction();
        }
    }

    getTeam(req, res) {
        res.json({
            team: "Group 6 Team",
            members: ["Benji", "Jason", "Bartek"]
        });
    }

    async rollbackTransaction() {
        try {
            await this.transactionManager.rollbackTransaction();
        } catch (err) {
            console.error(`error on rollback: ${err}`)
        }
    }
}

module.exports = DVDController;

if (require.main === module) {
    const service = new DVDController();
    service.start();
}