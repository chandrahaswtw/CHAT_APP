const express = require('express');
const hbs = require('hbs');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./UTILS/message');
const {push_users,retrieve_users,pop_users,get_name} = require('./UTILS/arr');

const app = express();
const static_filepath = path.join(__dirname + './../PUBLIC');
const port = process.env.PORT || '3000';
app.set('view engine','hbs');
app.use(express.static(__dirname + './../PUBLIC'));


var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
   
   socket.on('user_details',(message)=>{

       push_users(message.id,message.name,message.room)

       // EMITTING MESSAGE TO USERS
       socket.emit('newMessage',generateMessage('Admin','WELCOME TO THE CHAT APP'));
       socket.broadcast.emit('newMessage',generateMessage('Admin',`${message.name} JOINED`));

       //REFRESHING THE USERS LIST AS SOON AS THE USER IS CONNECTED
       io.emit('users_list',retrieve_users());


   })

   console.log('NEW USER CONNECTED'); 

   socket.on('createMessage', (message,callback) => {
    io.emit('newMessage',generateMessage(message.from,message.text))
    callback();
    });

    socket.on('sendLocation',(location,callback)=>{
    io.emit('newLocationMessage',generateLocationMessage(location.from,location.lat,location.lon))
    callback();
    })
  
   socket.on('disconnect',()=>{
        console.log('USER DISCONNECTED');
        io.emit('user_disconnect',get_name(socket.id)[0].name);
        pop_users(socket.id);
        io.emit('users_list',retrieve_users());
   }) 

})

server.listen(port,()=>{console.log(`THE APP STARTED ON PORT ${port}`)});