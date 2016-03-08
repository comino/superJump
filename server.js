
/**
 * Module dependencies
 */
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');
var mqtt    = require('mqtt');

var client  = mqtt.connect('mqtt://test.mosquitto.org');


client.on('connect', function () {
  console.log("connected mqtt"); 
  client.publish('/bcx16', JSON.stringify({"score":5}) ) ;
  console.log( "pub done"); 
});

var app = express();
var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = mongoose.connect( 'mongodb://fsbackend:honeybee@dogen.mongohq.com:10099/test_mongo', {});

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);

module.exports = client; 