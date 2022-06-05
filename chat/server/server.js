const express = require('express');

const app = express();

const server = app.listen(3000, () => {
    console.log('Corriendo en puerto 3000');
})

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Se ha conectado el usuario: ' + socket.io);

    socket.on('disconnect', () => {
        console.log('El usuario ' + socket.io + ' se ha desconectado');
    });

    socket.on('sendMessage', (data) => {
        io.emit('message', data);
    });
});