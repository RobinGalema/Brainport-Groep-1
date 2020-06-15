var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var express = require('express'),
  app = module.exports.app = express();
var server = http.createServer(app);
server.listen(8000);
app.use(express.static('views'))


//If app gets / load index.ejs
app.get('/', function(req, res){
    res.render('index.ejs');
})

app.post('/fileupload', function(req,res){
  const path = 'views/uploads/Screen1/Video.mp4'

  try {
    fs.unlinkSync(path)
    //file removed
  } catch(err) {
    console.error(err)
  }
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
      var newpath = 'views/uploads/Screen1/' + 'Video.mp4';
      res.render('index.ejs');
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
        });
   });

})



