/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Court = require('../api/court/court.model');
var Time = require('../api/time/time.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Court.find({}).remove(function() {
  Court.create({
    country: 'Taiwan',
    court: '台北科技大學',
    city: '台北市',
    district: '大安',
    lat: 25.043204,
    long: 121.537544,
    desc: '偶爾辦系隊比賽',
    hours: [{begin: '0700', end: '2200'}],
    peaktime: [{begin: '1800', end: '2000'}],
    net: '有',
    basketnumber: 11,
    floor: '水泥地',
    water: {exist: true, desc: '在宿舍旁'},
    toilet: {exist: false},
    ceiling: false,
    likes: 300,
    hidden: true,
  }, function() {
      console.log('finished populating mapMarker');
    }
  );
});


// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });
