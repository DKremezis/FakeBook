
  var socket = io();

  socket.on('connect', function(  ) {

    console.log("Connected to server");

  });

  socket.on('disconnect', function(){
    console.log("Disconnected");
  });
    
  var userName;
  var password;

  document.getElementById("submitBttn").onclick = function(){

    userName = document.getElementById("userNameValue").value;
    password = document.getElementById("passwordValue").value;

    socket.emit('loggedUser', {
      user: userName,
      pw: password
    });

    socket.on('showPop', (result) =>{
        if (result)
            alert("User " + result.user + " succesfully logged in");
        else
            alert("User doesn't exist")
    });

}   
