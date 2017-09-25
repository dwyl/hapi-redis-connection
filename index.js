var pkg = require('./package.json');
var run_once = false; // ensure we only attach the .on 'stop' event once
var redisClient = require('redis-connection')(); // require & connect

exports.register = function(server, options, next) {

  server.ext('onPreAuth', function (request, reply) {
    if(!run_once) { // close the connection when the server stops (e.g in tests)
      run_once = true;
      server.on('stop', function () { // only one server.on('stop') listener
        require('redis-connection').killall(); // close active redis connection
        server.log(['info', pkg.name], 'Redis Connection Closed');
      });
    }
    request.redis = options.redisClient || redisClient; // assign once
    reply.continue()
  });
  next();
};

exports.register.attributes = {
  pkg: pkg
};
