var socket = io();   //We are making a request from the client to the server -
                        //to open up and web socket and keep that open.
   
   socket.on('connect',function (){
     console.log('CONNECTED TO SERVER');
   });

   
   socket.on('newMessage', function (message) {
    //console.log('newMessage', message);
    var li = $('<ol><ol>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
  });
   

//SPECIFYING EMIT FUNCTION COMING FROM THE TEXT BOX OF HTML. WE USE JQUERY
//wE CAN USE $ IN PLACE OF jQuery
$('#message_form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  });
});

socket.on('disconnect',function () {
  console.log('DISCONNECTED FROM SERVER');
});

   