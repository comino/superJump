/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/',                  home.index);

  app.get('/clear',             home.clear); 

  app.post('/data/:ID/:score',         home.postDevice); 
  app.get('/data/:ID/:score',          home.postDevice);

  app.get('/data/:ID/:data' ,    home.postDeviceTest);

  app.post('/fall/:ID/:move',   home.postKintect); 
  app.get( '/fall/:ID/:move',   home.postKintect); 

  app.get('/score',             home.getScore); 

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
