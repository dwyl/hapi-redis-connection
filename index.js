var assert = require('assert');
// if REDISCLOUD_URL Environment Variable is unset halt the server.start
// assert(process.env.REDISCLOUD_URL, 'Please set DATABASE_URL Env Variable');
var pkg = require('./package.json');
var internals = {};
var run_once = false;
var redisClient = require('redis-connection')(); // require & connect


exports.register = function(server, options, next) {

  server.ext('onPreAuth', function (request, reply) {
    // each connection created is shut down when the server stops (e.g tests)
    if(!run_once) {
      run_once = true;
      server.on('stop', function () { // only one server.on('stop') listener
        require('redis-connection').killall();
        server.log(['info', pkg.name], 'Redis Connection Closed');
      });
    }
    request.redis = redisClient; // assign once
    reply.continue()
  });
  next();
};

exports.register.attributes = {
  pkg: pkg
};
