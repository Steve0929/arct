
var express = require("express");
var app = express();
var server = require ('http').createServer(app);
var io = require ('socket.io').listen(server);
usuarios = [];
conexiones = [];


app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000);
console.log('SERVIDOR FUNCIONANDO');

app.get('/', function(req, res){
            res .sendFile(__dirname + '/index.html');

          });

io.sockets.on('connection', function(socket){
  conexiones.push(socket);
  console.log("Conectado: %s sockets conectados", conexiones.length);

//desconexion
  socket.on('disconnect',function(data){
    conexiones.splice(conexiones.indexOf(socket),1);
    console.log('Desonectado: %s sockets conectados',conexiones.length);
                          });

    //enviar msj:
    socket.on('send message',function(data){
      console.log(data);
      io.sockets.emit('new message', {msg: data});
    
                            });


});
