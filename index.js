const fs = require('fs');
const ytdl = require('ytdl-core');
var http = require('http');

http.createServer(function (req, res) {
  let queries = req.url.split('?')[1];
  if(req.url.startsWith('/watch') && queries && queries.split('v=')[1]){
    let vInfo = ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${queries.split('v=')[1]}`)
    .then(data => {
      res.setHeader('Content-Disposition', `attachment; filename=${data.title}.mp4`); 
      ytdl(`https://www.youtube.com/watch?v=${queries.split('v=')[1]}`)
      .pipe(res);
    });
  }
  else{
   res.write('Come Again');
   res.end(); 
 }
})
.listen(3000, function(){
 console.log("server start at port 3000");
});