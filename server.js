
/**
 * Module dependencies
 */
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');


var app = express();
var port = process.env.PORT || 3000;

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  // When performing a cross domain request, you will recieve
  // an OPTION request first to check if the application is available
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


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

