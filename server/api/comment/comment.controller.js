'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');

exports.index = function(req, res) {
  Comment.loadRecent(function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  });
};

// Get list of comments
// exports.index = function(req, res) {
//   Comment.find(function (err, comments) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json(comments);
//   });
// };

// Get a single comment
exports.show = function(req, res) {
  Comment.loadRecentByCourtId(req.params.court_id, function(err, comments) {
    if(err) { return handleError(res, err); }
    if(!comments) { return res.status(404).send('Not Found'); }
    return res.json(comments);
  });
};

exports.create = function(req, res) {
  // console.log(req);
  // delete req.body.date;
 
  var comment = new Comment(_.merge({ author: req.user._id }, req.body));
  comment.save(function(err, comment) {
    if(err) { return handleError(res, err); }
    return res.json(201, comment);
  });
};

// // Creates a new comment in the DB.
// exports.create = function(req, res) {
//   Comment.create(req.body, function(err, comment) {
//     if(err) { return handleError(res, err); }
//     return res.status(201).json(comment);
//   });
// };

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(comment);
    });
  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}