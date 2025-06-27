var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var app = express();

let storage = multer.memoryStorage();
let upload = multer({storage:storage});
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  const {originalname,mimetype,size} = req.file;
  const name = Buffer.from(originalname,'latin1').toString('utf-8');
  res.json({name: name, type: mimetype, size: size});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
