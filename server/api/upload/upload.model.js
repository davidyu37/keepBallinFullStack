'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Grid = require('gridfs-stream');

var UploadSchema = new Schema({
	court_id: String,
  file: [Schema.Types.Mixed]
});

UploadSchema.plugin(Grid);

module.exports = mongoose.model('Upload', UploadSchema);