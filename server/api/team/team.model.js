'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  captain: {
  	type: Schema.Types.ObjectId, 
  	ref: 'User'
  },
  teampic: {
    type: Schema.Types.ObjectId, 
    ref: 'Upload'
  },
  founded: Date,
  intro: String,
  represent: String,
  school: {
    name: String,
    major: String,
    class: String
  },
  company: {
    name: String,
    department: String
  },
  club: {
    name: String
  },
  private: Boolean,
  other: String,
  manager: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  coach: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  win: Number,
  lose: Number,
  members: [{
  	type: Schema.Types.ObjectId, 
  	ref: 'User'
  }],
  contact: String

}, {strict: false});

module.exports = mongoose.model('Team', TeamSchema);