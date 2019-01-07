module.exports.onChatMessage = (socket, data) => {
    console.log(`сообщение от ${socket.id}: ${data}`);
}