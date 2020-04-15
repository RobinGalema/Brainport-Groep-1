const express = require('express');
const app = express();
var http = require('http').createServer(app);
const io = require("socket.io")(http);
var publicDir = require('path').join(__dirname,'/public');

// Set the page to index.html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

app.use(express.static(publicDir));

http.listen(3000, function(){
    console.log('listening on *:3000');
  });

io.on('connection', (socket) => 
{
    console.log('a user connected');
})