const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/repairdb', { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('Сединение с БД установлено.');
    })
    .catch(err => {
        console.log(err);
    });
    
module.exports = mongoose;