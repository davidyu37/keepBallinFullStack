'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  courtId: String,
  content: String,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

// CommentSchema.statics = {
//   loadRecent: function(cb) {
//     this.find({})
//       .populate({path:'author', select: 'name'})
//       .sort('-date')
//       .limit(20)
//       .exec(cb);
//   }
// };

// CommentSchema.statics = {
//   loadByCourtId: function(courtId, cb) {
//     this.find({'courtId': courtId})
//       .sort('-date')
//       .exec(cb);
//   }
// };

CommentSchema.statics = {
  loadNow: function(start, courtId, cb) {
    this.find({'courtId': courtId})
      .populate({path:'author', select: 'name avatar'})
      .sort('-date')
      .skip(start)
      .limit(10)
      .exec(cb);
  },
  loadByCourtId: function(courtId, cb) {
    this.find({'courtId': courtId})
      .sort('-date')
      .exec(cb);
  }
};

module.exports = mongoose.model('Comment', CommentSchema);