const express = require('express');
const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const static_filepath = path.join(__dirname + './../PUBLIC');
const port = process.env.PORT || '3000';
app.set('view engine','hbs');
app.use(express.static(__dirname + './../PUBLIC'));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{

   console.log('NEW USER CONNECTED'); 

   socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage',{
      name : message.name,
      text: message.text,
     createdAt : new Date().getTime()
    })
});
  
   socket.on('disconnect',()=>{
        console.log('USER DISCONNECTED');
   }) 

})

server.listen(port,()=>{console.log(`THE APP STARTED ON PORT ${port}`)});
