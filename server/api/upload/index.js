'use strict';

var express = require('express');
var controller = require('./upload.controller');
// var multer = require('multer');

var router = express.Router();

// var upload = multer({
// 	dest: './client/assets/uploads/images',
// 	rename: function (fieldname, filename) {
// 		return filename + Date.now();
// 	},
// 	limits: {
// 	  files: 2
// 	},
// 	onFileUploadStart: function (file) {
// 	    console.log(file.originalname + ' is starting ...')
// 	},
// 	onFileUploadComplete: function (file) {
// 		console.log(file.fieldname + ' uploaded to  ' + file.path)
// 		imageUploaded=true;
// 	}

// }).fields([{name: 'courtpic', maxCount: 10}]);

router.get('/pictures', controller.index);
router.get('/pictures/:court_id', controller.show);
router.post('/pictures', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/pictures/:id', controller.destroy);

module.exports = router;