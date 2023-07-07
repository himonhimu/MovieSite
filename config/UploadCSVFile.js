const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');


class UploadCSVFile {
    static UploadCSVFile(req, folder_name) {
        let myFileName = '';
        var myStorage = multer.diskStorage({
          destination: function (req, file, cb) {
            // Uploads is the Upload_folder_name
            cb(null, `uploads/`);
          },
          filename: function (req, file, cb) {
            myFileName = file.originalname;
            cb(null, myFileName);
          },
        });
    
        let upload = multer({ storage: myStorage }).single('csvfile');
        
        return new Promise((resolve, reject) => {
            try {
                let results = []
                upload(req, null, function (err) {
                    fs.createReadStream(req.file.path)
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                      fs.unlinkSync(req.file.path);
                      resolve(results)
                    });
                });
            
            // resolve(1)
            } catch (error) {
                reject(error)
            }
        });
      }
       
}

module.exports = UploadCSVFile