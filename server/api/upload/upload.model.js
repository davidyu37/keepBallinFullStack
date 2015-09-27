'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UploadSchema = new Schema({
	url: String,
    s3Params: Schema.Types.Mixed, 
	date: { type: Date, default: Date.now },
	user: {
		type: Schema.Types.ObjectId,
    	ref: 'User'
	},
	team: {
		type: Schema.Types.ObjectId,
    	ref: 'Team'
	},
	court: {
		type: Schema.Types.ObjectId,
		ref: 'Court'
	}

}, {strict: false});

UploadSchema.statics = {
  loadByCourtId: function(courtId, cb) {
    this.find({'court': courtId})
      .populate({path:'user', select: 'name avatar'})
      .select('user url date')
      .exec(cb);
  }
};

module.exports = mongoose.model('Upload', UploadSchema);