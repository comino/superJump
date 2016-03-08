var mqtt    = require('mqtt');

var client  = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function () {
  console.log("connected mqtt"); 
  client.publish('/bcx16', JSON.stringify({"score":5}) ) ;
  console.log( "pub done"); 
});

module.exports = client; 