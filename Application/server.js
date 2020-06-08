var http = require('http');
var express = require('express'),
  app = module.exports.app = express();
var server = http.createServer(app);
server.listen(8000);
app.use(express.static('views'))
const io = require('socket.io').listen(server);

app.get('/Maps', (req,res) => {
    res.render('Client/BrainportMap/index.ejs')
})

app.get('/Hologram', (req,res) => {
    res.render('Client/Hologram/index.ejs')
})

app.get('/Video', (req,res) => {
    res.render('Client/Video/index.ejs')
})

app.get('/Admin', (req,res) => {
    res.render('Admin/index.ejs');
})

//Socket Listeners for certain functions
io.sockets.on('connection', (socket) => {
    console.log('A client is connected!');
    socket.on('connected', (msg) => {
        
    });

    socket.on('screenSwitch', (data) => {
       io.emit('toggleBox');
    })
});