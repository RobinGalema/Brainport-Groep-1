var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var express = require('express'),
  app = module.exports.app = express();
var server = http.createServer(app);
server.listen(8000);
app.use(express.static('Views'))
const io = require('socket.io').listen(server);

app.get('/', (req,res) => {
    res.render('index.ejs');
})

app.get('/hologramAdmin', (req,res) => {
    res.render('holodash.ejs');
})



app.post('/fileupload', function(req,res){

let btnname='';
let btnvideoname=''
   
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
    var newpath = 'Views/Holograms/' + fields.videoname;
    btnname = fields.name;
     btnvideoname= fields.videoname
    res.render('holodash.ejs');
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });
 });
 

 fs.readFile('Views/Holograms/holograms.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    obj.table.push({name: btnname , file: btnvideoname}); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFile('Views/Holograms/holograms.json', json, 'utf8', callback); // write it back 
}});
  
  })