require('dotenv').config();

const app  = require('./server/app');
const http = require('http').Server(app);

require('./server/io')(http);

let port = process.env.port || 3001;

http.listen(port, () => console.log(`Сервер запущен порт ${port}`));
