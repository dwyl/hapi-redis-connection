var Hapi = require('hapi');
var assert = require('assert');
var server = new Hapi.Server({ debug: { request: ['error'] } });

server.connection({ port: process.env.PORT || 8000 });

server.register({
  register: require('../index.js')
}, function (err) {
  if (err) {
    console.error(err);
    throw err;
  }
});

server.route({
  method: '*',
  path: '/',
  handler: function(request, reply) {
    // first set the value of "Everything" key to "Awesome!"
    request.redis.set('Everything', 'Awesome!', function(err, result) {
      // get the value of "Everything" key and return it
      request.redis.get('Everything', function(err, result) {
        console.log('>> Everything is ' + result)
        return reply('Everything is ' + result); // https://youtu.be/StTqXEQ2l-Y
      });
    });
  }
});

server.route({
  method: 'GET',
  path: '/incr',
  handler: function(request, reply) {
    request.redis.incr('counter', function(err, result) {
      console.log('>> Counter ' + result)
      return reply(result);
    });
  }
});

server.start(function() {
  console.log('Visit: http://127.0.0.1:'+server.info.port);
});

module.exports = server;
