const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const fetchVideoInfo = require('youtube-info');

app.use('/static', express.static('./static'));

app.listen(3000, () => { 
    console.log("Server Running ....");
});

app.get('/', (req, res) => { 
    res.sendFile('index.html', { root: './' });
});

app.get('/download', (req, res) => {
    var url = req.query.url;    
    var idVideo = ytdl.getVideoID(url);
    var downloadVideo = "";

    fetchVideoInfo(idVideo, function (err, videoInfo) {
      if (err) throw new Error(err);
          console.log("Youtube Video Information");
         
          console.log("Judul Video     : "+videoInfo.title);
          console.log("Deskripsi Video : "+videoInfo.description);
          console.log("Channel         : "+videoInfo.owner);
          downloadVideo = videoInfo.title+".mp4";
          
         res.header("Content-Disposition", 'attachment;\  filename="'+downloadVideo);    
         ytdl(url, {format: 'mp4'}).pipe(res);
 
      });
    
});


