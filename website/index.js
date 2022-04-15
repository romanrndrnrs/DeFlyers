const express = require("express");
const app = express();
const port = "3000";
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");
app.use(express.static('public'));


// app.get('/', (req,res) => {
//     res.send("Hello world!");
// })

app.post('/fichier', (request,response) =>{
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
//        console.log(files);
          var oldpath = files.fileImage.filepath;
          var newpath = path.join(__dirname + '/public/images',  files.fileImage.newFilename + files.fileImage.originalFilename);
          fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                response.write(files.fileImage.newFilename + files.fileImage.originalFilename);
                response.end();
          });
    
    });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
    
})
