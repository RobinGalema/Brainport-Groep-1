var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
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

app.get('/Admin/AdminDash', (req,res) =>{
    res.render('Admin/AdminDash.ejs')
})

app.get('/Admin/holodash', (req,res) =>{
    res.render('Admin/HologramDashboard/holodash.ejs')
})

app.get('/Client/Vacatures', (req,res) => {
  res.render('Client/Vacatures/index.ejs')
})


//Making empty strings
let btnname='';
let btnvideoname=''

//When certain form is submitted
app.post('/Admin/fileupload', function(req,res){   
  //Read form data
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      //upload video for hologram to local folder

      
      var oldpath = files.filetoupload.path;
    var newpath = __dirname + '/views/Client/Hologram/Holograms/' + files.filetoupload.name;
    console.log(newpath)
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
    });

    //change empty strings
    btnname = fields.name;
     btnvideoname= files.filetoupload.name
    //re render page
    res.render('Admin/HologramDashboard/holodash.ejs');
      
 });

 //Do this function when done reading form
 setTimeout(createJSON, 500)
})

let createJSON = () => {
  //Read jsonfile with all holograms
  fs.readFile(__dirname + '/views/Client/Hologram/Holograms/holograms.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
      //get data
    obj = JSON.parse(data); 
    console.log(obj);
    //push new hologram to the obj
    obj.push({name: btnname , file: btnvideoname}); 
    json = JSON.stringify(obj);
    //rewrite file
    fs.writeFile(__dirname+'/views/Client/Hologram/Holograms/holograms.json', json,function (err) {
      if (err) throw err;
      console.log('Saved!');
    }); 
}});
}

//Socket Listeners for certain functions
io.sockets.on('connection', (socket) => {
    console.log('A client is connected!');
    socket.on('connected', (msg) => {
        
    });

    socket.on('screenSwitch', (data) => {
       io.emit('toggleBox');
    })
});