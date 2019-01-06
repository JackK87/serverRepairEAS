const app = require('express')();

const mainController = require('../controllers/main');

app.get('/', mainController.home);



module.exports = app;