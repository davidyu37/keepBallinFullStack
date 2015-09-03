'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TimeSchema = new Schema({
  begin: String, end: String
});

var CourtSchema = new Schema({
  country: {type: String, default: 'Taiwan'},
  court: String,
  city: String,
  district: String,
  lat: Number,
  long: Number,
  desc: String,
  hours: [TimeSchema],
  peaktime: [TimeSchema],
  net: String,
  basketnumber: Number,
  floor: String,
  water: {exist: Boolean, desc: String},
  toilet: {exist: Boolean, desc: String},
  ceiling: Boolean,
  indoor: {type: Boolean, default: false},
  pics: [Number],
  likes: Number,
  hidden: {type: Boolean, default: true},
  comments: [{author: String, body: String, date: Date}]
});

module.exports = mongoose.model('Court', CourtSchema);