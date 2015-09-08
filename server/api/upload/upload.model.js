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
	date: { type: Date, default: Date.now }
});

// UploadSchema.plugin(Grid);

module.exports = mongoose.model('Upload', UploadSchema);