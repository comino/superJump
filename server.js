
/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');
var mosca = require('mosca')

var home = require('./app/controllers/home.js');
var app = express();
var port = process.env.PORT || 3000;

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://fsbackend:honeybee@dogen.mongohq.com:10099/test_mongo',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: ascoltatore
};

var server = new mosca.Server(settings);

// Connect to mongodb
//var connect = mongoose.connect( 'mongodb://fsbackend:honeybee@dogen.mongohq.com:10099/test_mongo', {});

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

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running');
}



app.listen(port);
console.log('Express app started on port ' + port);
