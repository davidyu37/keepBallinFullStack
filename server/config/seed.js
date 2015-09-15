/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Court = require('../api/court/court.model');
var Upload = require('../api/upload/upload.model');
var Comment = require('../api/comment/comment.model');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

var random = randomDate(new Date(1950, 0, 1), new Date());



Upload.find({}).remove(function() {
  console.log('uploads cleared');
});

Comment.find({}).remove(function() {
  console.log('comments cleared');
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: '林小胖',
    email: 'fat@fat.com',
    password: 'fat',
    position: '中鋒',
    jerseynumber: 65,
    height: 170,
    weight: 80,
    birthday: new Date('01/01/1990')
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
    address: '106台北市大安區建國南路一段81號',
    desc: '偶爾辦系隊比賽',
    hours: [{begin: '0700', end: '2200'}],
    peaktime: [{begin: '1800', end: '2000'}],
    net: true,
    nettype: '繩網',
    basketnumber: 11,
    floor: '水泥地',
    water: {exist: true, desc: '在宿舍旁'},
    toilet: {exist: false},
    ceiling: false,
    lights: true,
    likes: 300,
    bench: true,
    rent: false
  }, function() {
      console.log('finished populating mapMarker');
    }
  );
});

