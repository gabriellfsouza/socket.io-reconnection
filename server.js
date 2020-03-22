const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

app.use('/',express.static(__dirname + '/public'))
const server = http.createServer(app).listen(3333);

const io = socketIO(server);

let count = 0;

io.on('connection',socket=>{
  count ++;
  io.emit('users.count',count);

  socket.on('disconnect',()=>{
    count --;
    io.emit('user.count',count);
  })
})