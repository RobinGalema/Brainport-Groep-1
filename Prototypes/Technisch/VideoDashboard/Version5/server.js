// Video Dashboard Through Youtube Link

//Dependencies
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

//If app gets request for certain screen
app.get('/screen1', (req,res)=>{
    res.render('screen1.ejs');
})
app.get('/screen2', (req,res)=>{
    res.render('screen2.ejs');
})
app.get('/screen3', (req,res)=>{
    res.render('screen3.ejs');
})
app.get('/screen4', (req,res)=>{
    res.render('screen4.ejs');
})

//Socket Listeners for certain functions
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

    socket.on('getScreenVideo' , (data)=>{
        getCertainVideo(data)
    })
});

/**
 * Gets all videos from database
 */
let getVideos = () => {
    //Connecting to database
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BPVideos");
        //Finding all videos in database
        dbo.collection("Videos").find({}).toArray(function(err, result) {
            if (err) throw err;
            let videos = result
            //Sending to client
            io.emit('VideoArray', videos );
            db.close();
          });
      });
}

/**
 * This function pushes a new video for a screen to the database
 * @param {Array} data - Array received through socket with data for video
 */
let insertVideo = (data) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BPVideos");
        var newvalues = { $set: {link: data[1]} };
        var myquery = {iframeID: data[0]}
        //Insert with query
        dbo.collection("Videos").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
          });
      });

      io.emit('ReloadDash')
}

/**
 * This function gets a video for a certain screen, if client screen is opened.
 * @param {string} data - This is the iframe id that we got through socket.
 */
let getCertainVideo = (data)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BPVideos");
        var query = { iframeID: data }
        //Getting video with query
        dbo.collection("Videos").find(query).toArray(function(err, result) {
            if (err) throw err;
            let video = result[0]
            io.emit('certainVideo', video.link);
            db.close();
          });
      });
}