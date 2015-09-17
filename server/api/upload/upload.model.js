'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    // Grid = require('gridfs-stream');

var UploadSchema = new Schema({
	court_id: String,
	filename: String,
	url: String,
	mimetype: String,
	date: { type: Date, default: Date.now },
	user: {
		type: Schema.Types.ObjectId,
    	ref: 'User'
	},
	team: {
		type: Schema.Types.ObjectId,
    	ref: 'Team'
	}

}, {strict: false});

// UploadSchema.plugin(Grid);

module.exports = mongoose.model('Upload', UploadSchema);