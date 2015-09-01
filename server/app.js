/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');	
var config = require('./config/environment');
var Grid = require('gridfs-stream');
var conn = mongoose.connection;
var fs = require('fs');

Grid.mongo = mongoose.mongo;

//How to upload file with gridfs
// conn.once('open', function () {
//     console.log('open');
//     var gfs = Grid(conn.db);
 
//     // streaming to gridfs
//     //filename to store in mongodb
//     var writestream = gfs.createWriteStream({
//         filename: 'court picture'
//     });
//     // console.log(fs.createReadStream('../client/assets/images/court_pics/example.jpeg').pipe(writestream));
//     fs.createReadStream('../client/assets/images/court_pics/example.jpeg').pipe(writestream);
//  	console.log(fs.createReadStream('../client/assets/images/court_pics/example.jpeg').pipe(writestream));
//     writestream.on('close', function (file) {
//         // do something with `file`
//         console.log(file.filename + 'Written To DB');
//     });
// });


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
