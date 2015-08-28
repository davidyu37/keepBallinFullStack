/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var time = require('./time.model');

exports.register = function(socket) {
  time.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  time.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('time:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('time:remove', doc);
}