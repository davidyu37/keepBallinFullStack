'use strict';

var express = require('express');
var controller = require('./upload.controller');
// var multer = require('multer');

var router = express.Router();

router.get('/pictures', controller.index);
router.get('/pictures/:court_id', controller.show);
router.post('/pictures', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/pictures/:id', controller.destroy);

module.exports = router;