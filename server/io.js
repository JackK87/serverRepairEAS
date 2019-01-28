module.exports = (http) => {

    const io = require('socket.io')(http);
    const socketController = require('../controllers/socket');

    io.on('connection', (socket) => {
        
        console.log(`пользователь ${socket.id} подключился`);

        /***
         * авторизация пользователей (посредник запросов)
        */
        socket.use((paket, next) => {
            
            let user = null;
            console.log(paket);

            paket.forEach((value, index, paket) => {
                console.log(value);
                if (typeof value == 'object' && value.hasOwnProperty('user')) {
                    user = value.user;
                    console.log(user);
                }
            });

            console.log('проверка пользователя...');

            if (user && typeof user == 'object' && user.hasOwnProperty('name') && user.hasOwnProperty('pwd')) {
                socketController.autorize(user.name, user.pwd, next);
            }
            else {
                console.log(`ошибка разбора запроса ${user}`);
                next(new Error('Ошибка авторизации'));
            }
        });

        //***************************Отправка сообщении пользователям*************************************/

        //отправка подключенному клиенту всех пользователей на сервере
        socket.emit('connect_users', socketController.sendConnectUsers(socket.id, io.sockets.sockets));
        //отправка всем клиентам поключенного пользователя
        socket.broadcast.emit('connected_user', socketController.sendConnectedUser(socket.id));

        //***************************Получение сообщении от пользователей*************************************/

        //отключение пользователя
        socket.on('disconnect', () => { socketController.disconnectUser(socket); });
        //отправка сообщения от одного пользователя другому
        socket.on('on_chat_message', (data) => { socketController.sendMessage(socket, data); });
    });
};