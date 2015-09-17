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

// Get uploads by court_id
exports.show = function(req, res) {
  Upload.find({'court_id': req.params.court_id}, function(err, upload) {
    if(!upload) { return }
    if(err) { return handleError(res, err); }
    return res.json(upload);
  });

};

// Creates a new upload in the DB.
exports.create = function(req, res, next) {
  var file = req.files.file;
  var court_id = req.body.court_id;
  var user_id = req.user._id;
  var filename = path.join('./client/assets/uploads/images/courts', file.name);

  // Information saving along with file
  var courtpic = {
    court_id: court_id,
    filename: file.name,
    url: path.join('assets/uploads/images/courts', file.name),
    mimetype: file.mimetype,
    user: user_id 
  };
  writeFile(filename, file.data, courtpic, res);
};


// Deletes a upload from the DB.
exports.destroy = function(req, res) {
  var filename = path.join('./client/assets/uploads/images/courts', req.params.filename);
  fs.unlink(filename, function (err) {
    if (err) {
      console.error("delete error:  " + err.message);
    } else {
      console.log('successfully deleted ' + filename);
      Upload.findById(req.params.id, function (err, upload) {
        if(err) { return handleError(res, err); }
        if(!upload) { return res.status(404).send('Not Found'); }
        
        upload.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.status(204).send('No Content');
        });
      });
    }
  });
};

//Upload user's profile picture
exports.profilepic = function(req, res) {
  
  var file = req.files.file;
  var user_id = req.user._id;
  var filename = path.join('./client/assets/uploads/images/profile', file.name);

  // Information saving along with file
  var profilePic = {
    filename: file.name,
    url: path.join('assets/uploads/images/profile', file.name),
    mimetype: file.mimetype,
    user: user_id
  };
  writeFile(filename, file.data, profilePic, res);
};

//Upload team photo
exports.teampic = function(req, res) {
  
  var file = req.files.file;
  var user_id = req.user._id;
  var filename = path.join('./client/assets/uploads/images/team', file.name);

  // Information saving along with file
  var teamPic = {
    filename: file.name,
    url: path.join('assets/uploads/images/team', file.name),
    mimetype: file.mimetype,
    user: user_id
  };
  writeFile(filename, file.data, teamPic, res);
};

function writeFile(url, data, objectForUpload, res) {
  fs.writeFile(url, data, function(err) {
    if (err) {
     console.error("write error:  " + err.message);
    } else {
     console.log("Successful Write to " + url);
      Upload.create(objectForUpload, function(error, upload) {
        if(error) { return handleError(res, error); }
        return res.status(201).json(upload);
      });
    }
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}