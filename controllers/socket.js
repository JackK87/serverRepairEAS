const mongoose = require('../server/mongoose');

const User = require('../models/User').User;

//***************************Получение сообщении от пользователей*************************************/

//отправка сообщения от одного пользователя другому
module.exports.sendMessage = (socket, data) => {

    if (data && typeof data == 'object' && data.hasOwnProperty('message')) {

        const message = data.message;

        socket.broadcast.to(message.to).emit('on_everyone_message', message.text);
        console.log(`сообщение от ${message.id}: ${message.to}, ${message.text}`);
    }
    else
        console.warn(`ошибка разбора пакета.\n${data}`);
};

//отключение пользователя
module.exports.disconnectUser = (socket) => {

    socket.broadcast.emit('disconnected_user', {
        userId: socket.id
    });
    console.log(`пользователь ${socket.id} отключился`);
};

//***************************Отправка сообщении пользователям*************************************/

//отправка всем клиентам поключенного пользователя
module.exports.sendConnectedUser = (id) => {
    return {
        userId: id
    };
};

//отправка подключенному клиенту всех пользователей на сервере
module.exports.sendConnectUsers = (currentUser, users) => {

    let usersConnected = [];

    for (const user in users)
        if (currentUser != user) usersConnected.push(user);

    return usersConnected;
};

//***************************Посредники*************************************/

//авторизация пользователя
module.exports.autorize = (username, password, next) => {

    console.log('поиск пользователя в базе данных...');
    User.findOne({
        username: username
    }, function (err, findUser) {

        if (err) {
            console.error('ошибка\n' + err);
            return next(err);
        }

        console.log('ошибок при запросе не возникло.');

        if (findUser && findUser.encryptPassword(password, findUser.salt) === findUser.hashedPassword) {

            console.log('проверка пользователя прошла успешно.');

            next();
        } else {

            console.warn(`проверка пользователя не прошла.\nпользователь бд: ${findUser}\nпользователь с запроса ${username}:${password}`);

            next(new Error('Ошибка авторизации'));
        }
    });
};