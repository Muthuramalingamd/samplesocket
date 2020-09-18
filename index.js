var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
   console.log('A user connected');

   //Send a message when 
   setTimeout(function() {
      //Sending an object when emmiting an event
      socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
   }, 4000);
//listen event
socket.on('dukamuchatsend', function(data) {
    console.log(data);
    socket.emit('dukamuchatreceive',data)
 
 });
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(8080, function() {
   console.log('listening on localhost:8080');
});