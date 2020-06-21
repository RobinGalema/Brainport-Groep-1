# ReadMe Video Library #   
**VideoLib makes use of socket, to connect with the server.**<br><br>

With videoLoader you can do a couple of things.   

*In the html the iframe id's all should be a certain 'video' with a number behind it.*     
## MongoDB Setup ##
The mongoDB database setup for this library is fairly easy.  
It just needs 3 fields, the id, iframeID and name.  
id: the unique id mongoDB makes for a field.  
iframeID: iframeID has multiple functions:  
           &emsp; 1. it has the same id in it as te iframe you want the video in at the dashboard.  
            &emsp;2. the <title> of each seperate screen should be the same as the iframeID  
link: This has the unique youtube video id in it, thats the part after v=   

create a database first and link it in nodejs, get the cluster url and put in in the code  
const url = "mongodb+srv://username:password@cluster0-ybw87.mongodb.net/test?retryWrites=true&w=majority";   

## Functions ##  
**You can load the Page with videoLoader().loadPage()**  
This function only sends a message 'loadVideos' through socket, this means that the server side does the rest.   

*This is the server side function*
```
//Getting all videos from database  
let getVideos = () => {  
    //Connecting to database  
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err;  
        var dbo = db.db(<Your database name>);  
        //Finding all videos in database  
        dbo.collection(<Your database collection name>).find({}).toArray(function(err, result) {  
            if (err) throw err;  
            let videos = result  
            //Sending to client  
            io.emit('VideoArray', videos );   **!!MAKE SURE THE EMIT IS CALLED 'VideoArray'!!**    
            db.close();  
          });  
      });  
}    
```

<b>You can reload the page with videoLoader().reloadPage()</b><br>
the only thing this function does is clear the cache and reload the page, so when the user updated a video, you can use it to refresh.<br><br>

<b>You can update a video in the database with videoLoader().updateVideoDB(e)</b><br>
This is what happens when the submitbutton gets pushed. The submitbutton has a dest parameter with the same number as the number the iframe id(of the iframe you want to change) has in it.<br>
Make sure that every sumbit button has a unique id, so the target.getattribute wil work.<br>
Because the function will use the click event of a certain button.<br><br>

What the function does is get the url out of the input field and push it into an array, and find which screen the video is for.<br>
Then it sends an array through socket with data ['iframeID','link'] and name 'newVideo' to the server. <br>
So if the server gets newVideo through socket, it will insert it in the database through this piece of code.<br><br>
<i>html form code</i><br>
Make sure the form used is built up like this.<br>
<i>id of this part has link+'the same number used in the dest of submitbutton'</i><br>

```
<input id='link1' type='text' placeholder="youtube link"/>
<input id='subm4' class="SubmitButton" type='submit'  dest='1'/>
 ```
 
<br><br>
<i>Server side code</i><br><br>
```
//Inserting filled in video in database<br>
 let insertVideo = (data) => {<br>
    MongoClient.connect(url, function(err, db) {<br>
        if (err) throw err;<br>
        var dbo = db.db(<Your database name>);<br>
        var newvalues = { $set: {link: data[1]} };<br>
        var myquery = {iframeID: data[0]}<br>
        //Insert with query<br>
        dbo.collection(<Your database collection>).updateOne(myquery, newvalues, function(err, res) {<br>
            if (err) throw err;<br>
            console.log("1 document updated");<br>
            db.close();<br>
          });<br>
      });<br>
      io.emit('ReloadDash')<br>
}<br><br>
```

after putting a updated video in the database use videoLoader().reloadPage()