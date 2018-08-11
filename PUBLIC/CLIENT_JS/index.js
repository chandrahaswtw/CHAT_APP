
var socket = io();   //We are making a request from the client to the server -
                     //to open up and web socket and keep that open.


//*********************EMIT EVENTS**********************//

var name = ($.deparam(window.location.search).NAME_AREA).toUpperCase();
var room = $.deparam(window.location.search).ROOM_AREA;
var id;


//EMITTING TEXT FROM THE FRONTEND - START
$('#message_form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: name,
    text: jQuery('[name="message"]').val()
  },
  function()
  { $('[name="message"]').val('') }
);
});

//EMITTING THE LOCATION OF USER FROM FRONTEND
$('#send_location').on('click',function(){
  if(!navigator.geolocation)
  {
    alert('GEOLOCATION not supported by the browser');
    return;
  }

  $('#send_location').attr('disabled',true).val('SENDING LOCATION....');

  navigator.geolocation.getCurrentPosition(function(loc) {
      socket.emit('sendLocation',{
        from: name,
        lat:  loc.coords.latitude, 
        lon : loc.coords.longitude
      },function() 
      {$('#send_location').removeAttr('disabled').val('SEND LOCATION');})
      }), 
    function() {alert('UNABLE TO FETCH THE LOCATION')
    $('#send_location').removeAttr('disabled').val('SEND LOCATION');
    }
})

//*********************SEND EMIT OR BOTH**********************//

  socket.on('connect',function (){
    var id = socket.id;
    var li = $('<li></li>');
    var em = $('<em style="color:green"></em>')
    em.text('CONNECTED TO SERVER')
    li.append(em);
    $('#messages').append(li);

    //EMITTING USER DATA FROM FRONTEND
    socket.emit('user_details',{id,name,room});
  });

  socket.on('users_list',function(message) {
      $('#people_list').empty();
      
      message.forEach((element) => {
        var li = $('<li></li>');
        console.log(element);
        li.text(element);
        $('#people_list').append(li);
      });

  })
  

  function scrolltop() {
  var messages = $('.sect_main');
  var scroll_Height = messages.prop('scrollHeight');
    $('.sect_main').scrollTop(scroll_Height);
   }
   
   
   socket.on('newMessage', function (message) {
    //console.log('newMessage', message);
    // var li = $('<li></li>');
    // li.text(`${message.from} ${message.createdAt}: ${message.text}`);
    // $('#messages').append(li);
    var template = $('#send_msg_template').html();
    var insta = Mustache.render(template,{
      from:message.from,
      createdAt:message.createdAt,
      text:message.text
    })
    $('#messages').append(insta);
    scrolltop();
  });

  socket.on('newLocationMessage',function(message){
  //  var li = $('<li></li>');
  //  var a = $('<a target = "_blank">My Location</a>');
  //  li.text(`${message.from } ${message.createdAt}: `);
  //  a.attr('href',message.url);
  //  li.append(a);
  //  $('#messages').append(li);
  var template = $('#send_loc_template').html();
    var insta = Mustache.render(template,{
      from:message.from,
      createdAt:message.createdAt,
      url:message.url
    })
    $('#messages').append(insta);
    scrolltop();
  })

//SERVER DISCONNECT NOTIFICATION START
socket.on('disconnect',function () {
  var li = $('<li></li>');
     var em = $('<em style="color:red"></em>')
     em.text('DISCONNECTED FROM SERVER. REFRESH THE PAGE')
     li.append(em);
     $('#messages').append(li);
});

socket.on('user_disconnect',function (name_) {
  var li = $('<li></li>');
     var em = $('<em style="color:red"></em>')
     em.text(`${name_} DISCONNECTED`)
     li.append(em);
     $('#messages').append(li);
});



   