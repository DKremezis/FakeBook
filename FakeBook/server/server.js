  const path = require('path');
  const express = require('express');
  const http = require('http');
  const socketIO = require('socket.io');

  const publicPath = path.join(__dirname, '../public');
  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);
  var io = socketIO(server);

  app.use(express.static(publicPath));

  io.on('connection', (socket) => { 

      console.log("User Connected");


    socket.on('disconnect', () =>{

      console.log("User Disconnected");

    });


    socket.on('loggedUser', (user) => {

        checkIfUserExists(user).then((res) => {

            console.log(res);
            socket.emit('showPop', res);

        });

    });

  });

      server.listen(port, () =>{
    console.log(`Connected to port ${port}`);
});


// SQL CONNECTION ------------------------------------------------------

  var checkIfUserExists= (user) =>{

    return new Promise((resolve, reject) => {

        var databaseManager = require('./databaseManager.js')
          databaseManager.executeStatement("select * from dbo.usersTable").then((usersFromDB) =>{
            for (var i = 0; i < usersFromDB.length; i++){
                if (usersFromDB[i].user === user.user && usersFromDB[i].password === user.pw){
                    console.log("user is valid");
                    resolve(user);
           }
          }
        }).catch((message)=>{
            console.log(message);
            reject(message);
            });

    });

  }
