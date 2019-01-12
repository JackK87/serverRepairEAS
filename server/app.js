const app = require('express')();

const mainController = require('../controllers/main');

app.get('/', mainController.home);
app.get('/chat', mainController.chat);

module.exports = app;