/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /times              ->  index
 * POST    /times              ->  create
 * GET     /times/:id          ->  show
 * PUT     /times/:id          ->  update
 * DELETE  /times/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var time = require('./time.model');

// Get list of times
exports.index = function(req, res) {
  time.find(function (err, times) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(times);
  });
};

// Get a single time
exports.show = function(req, res) {
  time.findById(req.params.id, function (err, time) {
    if(err) { return handleError(res, err); }
    if(!time) { return res.status(404).send('Not Found'); }
    return res.json(time);
  });
};

// Creates a new time in the DB.
exports.create = function(req, res) {
  time.create(req.body, function(err, time) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(time);
  });
};

// Updates an existing time in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  time.findById(req.params.id, function (err, time) {
    if (err) { return handleError(res, err); }
    if(!time) { return res.status(404).send('Not Found'); }
    var updated = _.merge(time, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(time);
    });
  });
};

// Deletes a time from the DB.
exports.destroy = function(req, res) {
  time.findById(req.params.id, function (err, time) {
    if(err) { return handleError(res, err); }
    if(!time) { return res.status(404).send('Not Found'); }
    time.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}