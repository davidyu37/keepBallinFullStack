'use strict';

var _ = require('lodash');
var Upload = require('./upload.model');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

// Get list of uploads
exports.index = function(req, res) {
  console.log(req.query);
  Upload.find(function (err, uploads) {
    if(err) { return handleError(res, err); }
    console.log('got something from upload');
    return res.status(200).json(uploads);
  });
};

// Get a single upload
exports.show = function(req, res) {
  console.log('show');
  console.log(req.params.id);

  gfs.findOne({ _id: req.params.id}, function (err, file) {
    console.log(file.contentType);
    res.writeHead(200, {'Content-Type': file.contentType});
    
    var readstream = gfs.createReadStream({
        filename: file.filename
    });
 
      readstream.on('data', function(data) {
          res.write(data);
      });
      
      readstream.on('end', function() {
          res.end();        
      });
 
    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });
 
  // gfs.files.find({ _id: req.params.id }).toArray(function (err, files) {
 
  //     if(files.length===0){
  //     return res.status(400).send({
  //       message: 'File not found'
  //     });
  //     }
  
  //   res.writeHead(200, {'Content-Type': files[0].contentType});
    
  //   var readstream = gfs.createReadStream({
  //       filename: files[0].filename
  //   });
 
  //     readstream.on('data', function(data) {
  //         res.write(data);
  //     });
      
  //     readstream.on('end', function() {
  //         res.end();        
  //     });
 
  //   readstream.on('error', function (err) {
  //     console.log('An error occurred!', err);
  //     throw err;
  //   });
  // });
 
  // Upload.findById(req.params.id, function (err, upload) {
  //   if(err) { return handleError(res, err); }
  //   if(!upload) { return res.status(404).send('Not Found'); }
  //   return res.json(upload);
  // });
};

// Creates a new upload in the DB.
exports.create = function(req, res, next) {
  console.log(req.files.file);
  var part = req.files.file;
 
  var writeStream = gfs.createWriteStream({
    filename: part.name,
    mode: 'w',
    content_type:part.mimetype
  });


  writeStream.on('close', function() {
    return res.status(200).send({
    message: 'Success'
    });
  });
      
  writeStream.write(part.data);

  writeStream.end();
 


  // Upload.create(req.body, function(err, upload) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json(upload);
  // });
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