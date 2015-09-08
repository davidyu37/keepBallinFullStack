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