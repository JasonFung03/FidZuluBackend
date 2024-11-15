const express = require('express');
const ToysService = require('../service/toys-service');

class ToysRestController {
    constructor(app){
        this.ToysService = new ToysService();

        const router = express.Router();
        router.get('/toys/all/:location', this.getAllToys.bind(this));
        router.get('/toys/team', this.getTeam.bind(this));
        router.get('/ping', this.ping.bind(this));

        app.use('/', router);
}

start() {
    this.app.listen(this.port, () => 
        console.log(`Toys service listening on port ${this.port}`)
    );
}

ping(req, res) {
    res.send('Service is listening');
}

async getAllToys(req, res) {
    const location = req.params.location;
    try {
        console.log("JSON PAYLOAD:", await this.ToysService.getAllToys(location));
        const toys = await this.ToysService.getAllToys(location);
        res.json(toys);
    } catch (err) {
        console.error(`Error on GET /toys/all/${location}: ${err}`);
        res.status(500).json({ error: err.message });
    }
}

getTeam(req, res) {
    try {
        const team = this.ToysService.getTeam();
        res.json(team);
    } catch (err) {
        console.error(`Error on GET /toys/team: ${err}`);
        res.status(500).json({ error: err.message });
    }
}


}
module.exports = ToysRestController;
