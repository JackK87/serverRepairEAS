const fs = require('fs');

module.exports.home = (req, res) => {

};

module.exports.chat = (req, res) => {
    fs.readFile(process.env.views + 'chat.html', 'utf-8', (err, data) =>{

        if (err){

            console.log(err);

            res.statusCode = 404;
            res.setHeader('Content-type', 'text/html; charset=utf-8');
            res.end('<h1>Страница не найдена.</h1>');
        } else {

            res.statusCode = 200;
            res.end(data);
        }
    });    
};