var test    = require('tape');
var decache = require('decache'); // http://goo.gl/JIjK9Y
var dir     = __dirname.split('/')[__dirname.split('/').length-1];
var file    = dir + __filename.replace(__dirname, '') + ' -> ';

var server = require('./server-example'); // test server which in turn loads our module

test(file + 'GET / as fast as you can!', function (t) {
  // var options = { method: 'GET', url: '/' };
  server.inject('/', function(response) {
    t.equal(response.statusCode, 200, '/ visited ');
    t.equal(response.payload, 'Everything is Awesome!');
    server.stop(function(){});
    t.end();
  });
});

test.only(file + 'GET /incr increments a counter', function (t) {
  // var options = { method: 'GET', url: '/' };
  server.inject('/incr', function(response) {
    t.equal(response.statusCode, 200, '/incr >> ' + response.result);
    console.log('response.result:', response.result);

    t.ok(response.result > 0, '0 < ' + response.result);
    server.stop(function(){});
    t.end();
  });
});
