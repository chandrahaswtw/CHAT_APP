var socket = io();   //We are making a request from the client to the server -
                        //to open up and web socket and keep that open.
   
   socket.on('connect',function (){
     console.log('CONNECTED TO SERVER');
   });

   
   socket.on('newMessage', function (message) {
    console.log('newMessage', message);
  });
   
   socket.on('disconnect',function () {
     console.log('DISCONNECTED FROM SERVER');
   });

   