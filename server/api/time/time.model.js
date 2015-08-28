'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TimeSchema = new Schema({
  begin: String, end: String
});

module.exports = mongoose.model('Time', TimeSchema);