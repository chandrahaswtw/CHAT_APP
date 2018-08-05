const express = require('express');
const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./UTILS/message');

const app = express();
const static_filepath = path.join(__dirname + './../PUBLIC');
const port = process.env.PORT || '3000';
app.set('view engine','hbs');
app.use(express.static(__dirname + './../PUBLIC'));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{

   console.log('NEW USER CONNECTED'); 

   socket.emit('newMessage',generateMessage('Admin','WELCOME TO THE CHAT APP'));
   socket.broadcast.emit('newMessage',generateMessage('ADMIN','A NEW USER HAS BEEN JOINED'));

   socket.on('createMessage', (message,callback) => {
    // console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from,message.text))
    callback();
    });

    socket.on('sendLocation',(location,callback)=>{
    io.emit('newLocationMessage',generateLocationMessage(location.from,location.lat,location.lon))
    callback();
    })
  
   socket.on('disconnect',()=>{
        console.log('USER DISCONNECTED');
   }) 

})

server.listen(port,()=>{console.log(`THE APP STARTED ON PORT ${port}`)});
