const express = require('express');
const bodyParser = require('body-parser');
const ToysRestController = require('../src/service/toys-rest-controller');

const app = express();
const PORT = process.env.PORT || 3033;

app.use(bodyParser.json());

const toysController = new ToysRestController(app);

app.listen(PORT, () => {
    console.log(`Toys service listening on port ${PORT}`);
});