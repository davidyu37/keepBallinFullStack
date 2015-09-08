'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  court_id: String,
  content: String,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

CommentSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'author', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

CommentSchema.statics = {
  loadRecentByCourtId: function(court_id, cb) {
    this.find({'court_id': court_id})
      .populate({path:'author', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

module.exports = mongoose.model('Comment', CommentSchema);