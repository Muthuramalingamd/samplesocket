var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080
app.get('/', function(req, res) {
   res.sendfile('index.html');
});
app.get('/test',function(req,res){
  return  res.send("Yes it is working").end().status(200);
})

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

http.listen(port, function() {
   console.log('listening on localhost:'+port);
});