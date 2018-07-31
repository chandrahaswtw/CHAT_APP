const express = require('express');
const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./UTILS/message');

const app = express();
const static_filepath = path.join(__dirname + './../PUBLIC');
const port = process.env.PORT || '3000';
app.set('view engine','hbs');
app.use(express.static(__dirname + './../PUBLIC'));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{

   console.log('NEW USER CONNECTED'); 

   socket.emit('newMessage',generateMessage('ADMIN','WELCOME TO THE CHAT APP'));
   socket.broadcast.emit('newMessage',generateMessage('ADMIN','A NEW USER HAS BEEN JOINED'));

   socket.on('createMessage', (message) => {
<<<<<<< HEAD
    // console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from,message.text))
=======
    console.log('createMessage', message);
    socket.broadcast.emit('newMessage',generateMessage(message.name,message.text))
>>>>>>> a7171d7b211965550a96337d43ba08e1312d2c5f
    });
  
   socket.on('disconnect',()=>{
        console.log('USER DISCONNECTED');
   }) 

})

server.listen(port,()=>{console.log(`THE APP STARTED ON PORT ${port}`)});
