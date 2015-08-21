'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CourtSchema = new Schema({
  court: String,
  district: String,
  lat: Number,
  long: Number,
  desc: String,
  hours: [{begin: Number, end: Number}],
  pics: [{picId: ObjectId, desc: String, src: String}],
  likes: Number,
  hidden: {type: Boolean, default: true},
  comments: [{author: String, body: String, date: Date}]
});

module.exports = mongoose.model('Court', CourtSchema);