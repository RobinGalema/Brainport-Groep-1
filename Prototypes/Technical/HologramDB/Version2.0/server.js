
// Define npm Modules
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var express = require('express'),
  app = module.exports.app = express();
var server = http.createServer(app);
server.listen(8000);
app.use(express.static('Views'))

// Load index.ejs when app gets /
app.get('/', (req,res) => {
    res.render('index.ejs');
})

// Load holodash.ejs when app gets /hologramAdmin
app.get('/hologramAdmin', (req,res) => {
    res.render('holodash.ejs');
})


//Making empty strings
let btnname='';
let btnvideoname=''

//When certain form is submitted
app.post('/fileupload', function(req,res){   
  //Read form data
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      //upload video for hologram to local folder
      var oldpath = files.filetoupload.path;
    var newpath = 'Views/Holograms/' + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
    });

    //change empty strings
    btnname = fields.name;
     btnvideoname= files.filetoupload.name
    //re render page
    res.render('holodash.ejs');
      
 });

 //Do this function when done reading form
 setTimeout(createJSON, 500)
})

let createJSON = () => {
  //Read jsonfile with all holograms
  fs.readFile('Views/Holograms/holograms.json', 'utf8', function readFileCallback(err, data){
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
    fs.writeFile('Views/Holograms/holograms.json', json,function (err) {
      if (err) throw err;
      console.log('Saved!');
    }); 
}});
}

