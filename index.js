const app  = require('./server/app');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let port = 3000;

io.on('connection', (socket) => 
    {
        console.log(`пользователь ${socket.id} подключился`);
        socket.broadcast.emit('connected_user', { userId: socket.id });

        socket.on('disconnect', () => {
                        socket.broadcast.emit('disconnected_user', { userId: socket.id });
                        console.log(`пользователь ${socket.id} отключился`);
                    });

        socket.on('on_chat_message', (data) => console.log(`сообщение от ${socket.id}: ${data}`));
    });



http.listen(port, () => console.log(`Сервер запущен порт ${port}`));
