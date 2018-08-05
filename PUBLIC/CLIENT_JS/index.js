
var socket = io();   //We are making a request from the client to the server -
                        //to open up and web socket and keep that open.
   
   socket.on('connect',function (){
     var li = $('<li></li>');
     var em = $('<em style="color:green"></em>')
     em.text('CONNECTED TO SERVER')
     li.append(em);
     $('#messages').append(li);
     //console.log('CONNECTED TO SERVER');
   });

   
   socket.on('newMessage', function (message) {
    //console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from} ${message.createdAt}: ${message.text}`);
    $('#messages').append(li);
  });

  socket.on('newLocationMessage',function(message){
   var li = $('<li></li>');
   var a = $('<a target = "_blank">My Location</a>');
   li.text(`${message.from } ${message.createdAt}: `);
   a.attr('href',message.url);
   li.append(a);
   $('#messages').append(li);
  })

//SERVER DISCONNECT NOTIFICATION START
socket.on('disconnect',function () {
  var li = $('<li></li>');
     var em = $('<em style="color:red"></em>')
     em.text('DISCONNECTED FROM SERVER. REFRESH THE PAGE')
     li.append(em);
     $('#messages').append(li);
     //console.log('DISCONNECTED FROM SERVER');
});
//SERVER DISCONNECT NOTIFICATION END

//*********************EMIT EVENTS**********************//


//RECIEVING THE LOCATION OF USER FROM FRONTEND START
$('#send_location').on('click',function(){
    if(!navigator.geolocation)
    {
      alert('GEOLOCATION not supported by the browser');
      return;
    }

    $('#send_location').attr('disabled',true).val('SENDING LOCATION....');

    navigator.geolocation.getCurrentPosition(function(loc) {
        socket.emit('sendLocation',{
          from: 'User',
          lat:  loc.coords.latitude, 
          lon : loc.coords.longitude
        },function() 
        {$('#send_location').removeAttr('disabled').val('SEND LOCATION');})
        }), 
      function() {alert('UNABLE TO FETCH THE LOCATION')
      $('#send_location').removeAttr('disabled').val('SEND LOCATION');
      }
})
//RECIEVING THE LOCATION OF USER FROM FRONTEND START

//RECIEVING TEXT FROM THE FRONTEND - START
$('#message_form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name="message"]').val()
    },
    function()
    { $('[name="message"]').val('') }
  );
});
//RECIEVING TEXT FROM THE FRONTEND - END


   