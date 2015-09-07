'use strict';

var _ = require('lodash'),
Upload = require('./upload.model'),
mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId,
fs = require('fs'),
path = require('path');
// db = mongoose.connection.db,
// Grid = require('gridfs-stream'),
// Async = require('async'),
// gfs = new Grid(db);
// Grid.mongo = mongoose.mongo;

// Get list of uploads
exports.index = function(req, res) {
  Upload.find(function (err, uploads) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(uploads);
  });
};

// Get a single upload
exports.show = function(req, res) {
  Upload.find({'court_id': req.params.court_id}, 'url', function(err, upload) {
    if(!upload) { return }
    if(err) { return handleError(res, err); }
    return res.json(upload);
  });

};
  //   if (err) return handleError(err);
  //   if (!doc) {
  //     return
  //   } 
  // }).then(function(uploads) {
  //     if(uploads.length===0){
  //       return res.status(400).send({
  //         message: 'File not found'
  //       });
  //     }

  //     var type = uploads[0].file[0].contentType
  //     res.writeHead(200, {'Content-Type': type});
  //     var buffer = [];

  //     Async.each(uploads, function(upload, callback){
        
  //       gfs.createReadStream({
  //           filename: upload.file[0].filename
  //       }).on('data', function(chunk) {
  //         res.write(chunk);
          
  //       }).on('end', function() {
  //         callback();
  //       });
             
  //     }, function(err) {
  //       res.end();
  //       // readstream.pipe(res);
  //       // console.log(res);
  //     });



      // var decoder = new StringDecoder('base64');
      // var buffer = '';
      // var dataBox = [];
      // var dataLen = 0;
      // AsyncEach(uploads, function(upload, callback) {
      //   console.log(upload);
      //   // setTimeout(console.log(upload), 1000);
      //   var file = upload.file[0];
      //   var readstream = gfs.createReadStream({
      //     filename: file.filename
      //   }).on('data', function(data) {
      //     // var canPush = true;
      //     // for(var j=0; j<dataBox.length; j++) {
      //     //   if(data == dataBox[j]) {
      //     //     canPush = false;
      //     //   }
      //     // }
      //     // if (canPush) {
      //       dataBox.push(data);
      //       dataLen += data.length; 
      //     // }
      //     // buffer += decoder.write(data);
      //     // buffer += data.toString('base64');
      //     // concat += data;
      //     // res.write(data);
      //   }).on('end', function() {
      //     var buf = new Buffer(dataLen); 
      //     for (var i=0,len=dataBox.length,pos=0; i<len; i++) { 
      //       dataBox[i].copy(buf, pos); 
      //       pos += dataBox[i].length; 
      //     } 
      //     callback(buf);
      //   });
        
      // }, function(buf, err) {
      //   // console.log(dataBox);
      //   // console.log(buff);
      //   // var image = new Buffer(buffer, 'base64');
      //   // var image = buffer.toString('utf8');
      //   // console.log(image);
      //   // console.log(res);
      //   // console.log(buffer);
      //   res.end();
      // });

      // for(var i=0; i < data.length; i++) {
      //   var file = data[i].file[0];

      //   // res.writeHead(200, {'Content-Type': file.contentType});

      //   var readstream = gfs.createReadStream({
      //       filename: file.filename
      //   });

      //   readstream.on('data', function(data) {
      //       console.log(data);
      //       // res.write(data);
      //   });
      
      //   readstream.on('end', function() {     
      //     res.end();
      //   });
        
      // }

// Creates a new upload in the DB.
exports.create = function(req, res, next) {
var file = req.files.file;
var court_id = req.body.court_id;
var filename = path.join('./client/assets/uploads/images', file.name);

// Information saving along with file
var courtpic = {
  court_id: court_id,
  filename: file.name,
  url: path.join('../assets/uploads/images', file.name),
  mimetype: file.mimetype
};

fs.writeFile(filename, file.data, function(err) {
  if (err) {
   console.error("write error:  " + err.message);
  } else {
   console.log("Successful Write to " + filename);
    Upload.create(courtpic, function(error, upload) {
      if(error) { return handleError(res, error); }
      return res.status(201).json(upload);
    });
  }
});

  // Upload.create(req.body, function(err, upload) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json(upload);
  // });
  // var court_id = req.body.court_id;
  // var part = req.files.file;
 
  // var writeStream = gfs.createWriteStream({
  //   filename: part.name,
  //   mode: 'w',
  //   content_type:part.mimetype,
  //   chunkSize: 1024,
  //   metadata: {
  //     court_id: court_id
  //   }
  // });
  // writeStream.write(part.data);
   
  // writeStream.on('close', function(file) {

  //   var tagId = file.metadata.court_id;
  //   //Put file in upload model to track
  //   Upload.create({court_id: tagId, file: file}, function(err, upload) {
  //     if(err) { return handleError(res, err); }
  //   });
    
  //   return res.status(200).send({
  //   message: 'Success',
  //   file: file
  //   });
  // });
      
  // writeStream.end();
 
};

// Updates an existing upload in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Upload.findById(req.params.id, function (err, upload) {
    if (err) { return handleError(res, err); }
    if(!upload) { return res.status(404).send('Not Found'); }
    var updated = _.merge(upload, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(upload);
    });
  });
};

// Deletes a upload from the DB.
exports.destroy = function(req, res) {
  Upload.findById(req.params.id, function (err, upload) {
    if(err) { return handleError(res, err); }
    if(!upload) { return res.status(404).send('Not Found'); }
    upload.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}