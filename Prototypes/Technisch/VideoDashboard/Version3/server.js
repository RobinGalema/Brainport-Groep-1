// Video Dashboard Through Youtube
var http = require('http');
var express = require('express'),
  app = module.exports.app = express();
var server = http.createServer(app);
server.listen(8000);
app.use(express.static('views'))
const io = require('socket.io').listen(server);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://daanbankers1:Senna4444@cluster0-ybw87.mongodb.net/test?retryWrites=true&w=majority";




//If app gets / load index.ejs
app.get('/', (req, res) => {
    res.render('index.ejs');
})


io.sockets.on('connection', (socket) => {
    console.log('A client is connected!');
    socket.on('connected', (msg) => {
        
    });

    socket.on('loadVideos', () => {
       getVideos()
    })

    socket.on('newVideo', (data)=>{
        insertVideo(data);
    })
});


//Socket Listeners
io.on('connect', (socket) => {
    console.log('Connected to the server!');        
});  


let getVideos = () => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BPVideos");
        dbo.collection("Videos").find({}).toArray(function(err, result) {
            if (err) throw err;
            let videos = result
            io.emit('VideoArray', videos );
            db.close();
          });
      });
}

let insertVideo = (data) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BPVideos");
        var newvalues = { $set: {link: data[1]} };
        var myquery = {name: data[0]}
        dbo.collection("Videos").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
          });
      });

      io.emit('ReloadDash')
}