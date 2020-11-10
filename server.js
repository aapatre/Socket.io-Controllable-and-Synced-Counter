var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

let syncnum = 1;

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('what num', () => {
        io.emit('what num', syncnum);
    });

    socket.on('inc num', () => ++syncnum);

    socket.on('dec num', () => --syncnum);
});

http.listen(port, () => {
    console.log("Listening on port: " + port);
});