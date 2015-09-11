'use strict';

var express = require('express');
var controller = require('./upload.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/pictures', controller.index);
router.get('/pictures/:court_id', controller.show);
router.post('/pictures', controller.create);
router.post('/pictures/profile', auth.isAuthenticated(), controller.profilepic);
router.delete('/pictures/:id/:filename', controller.destroy);

module.exports = router;