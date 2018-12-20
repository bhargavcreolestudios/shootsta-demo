let express   =   require("express")
let multer    =   require('multer')
let app       =   express()
let cors      = require('cors')
let fs        = require('fs')
let videoPath = './uploads'
let storage   =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, videoPath)
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({ storage : storage}).single('video')
// sync stored files
let storedFiles = ()=>{
  return fs.readdirSync(videoPath)
}

//  apply global cors response headers
app.use(cors())

// retrieve stored files names
app.get('/',function(req,res){
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: 1,'message':'Video Files',data:storedFiles() }, null, 3))
});

//  upload new video file
app.post('/upload',function(req,res){
    upload(req,res,function(err) {
        res.setHeader('Content-Type', 'application/json')
        if(err) {
          res.send(JSON.stringify({ status: 0,'message':'Unable to upload file' }, null, 3))
        }
        res.send(JSON.stringify({ status: 1,'message':'File has been uploaded' }, null, 3))
    });
});
// stream video
// dividing vides streaming in chunks rather than loading all at once
app.get('/video/:name', function(req, res) {
  // get file name from request
  const fileName = req.params.name
  // define file path
  const path = `${videoPath}/${fileName}`
  //  get stats of file
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunkSize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
// listing to 8000
app.listen(8000,function(){
    console.log("Working on port 8000 :)");
});
