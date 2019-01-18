module.exports.onChatMessage = (io, socket, data) => {
    console.log(`сообщение от ${socket.id}: ${data.to}, ${data.text}`);

    socket.broadcast.to(data.to).emit('on_everyone_message', data.text);  
};