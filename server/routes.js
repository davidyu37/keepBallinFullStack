/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
// var multipart = require('connect-multiparty');
var busboyBodyParser = require('busboy-body-parser');


module.exports = function(app) {

  // // Allow CORS loading
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  //Use busboy
  app.use(busboyBodyParser());

  // Insert routes below
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/courts', require('./api/court'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
