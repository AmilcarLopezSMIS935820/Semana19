var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var clients = 0;

io.on('connection', (socket) => {

    clients++;
    io.sockets.emit('broadcast', {
        total: clients + ' Clientes conectados'
    });

    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        clients--;
        io.sockets.emit('broadcast', {
            total: clients + ' Clientes conectados'
        });

    });

    //Recibiendo datos del cliente
    socket.on('clientMessage', (data) => {
        console.log(data);
    });

    setTimeout(() => {
        socket.send('Mensaje del servidor al cliente');
    }, 3000);

    socket.on('disconnect', () => {
        console.log('Un usuario se desconecto');
    })
});

http.listen(3000, () => {
    console.log('Escuchando puerto 3000');
});