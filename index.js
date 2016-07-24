var assert = require('assert');
// if REDISCLOUD_URL Environment Variable is unset halt the server.start
// assert(process.env.REDISCLOUD_URL, 'Please set DATABASE_URL Env Variable');

var pg = require('pg');
var pkg = require('./package.json');
var internals = {};
// var PG_CON = []; // this "global" is local to the plugin.
var run_once = false;

// // connect once and expose the connection via PG_CON
// pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//   assert(!err, pkg.name + 'ERROR Connecting to PostgreSQL!');
//   PG_CON.push({ client: client, done: done});
//   return;
// });

function assign_connection (request, reply) { // DRY
  request.pg = { client: PG_CON[0].client, done: PG_CON[0].done };
  reply.continue();
}

exports.register = function(server, options, next) {

  server.ext('onPreAuth', function (request, reply) {
    // each connection created is shut down when the server stops (e.g tests)
    if(!run_once) {
      run_once = true;
      server.on('stop', function () { // only one server.on('stop') listener
        PG_CON.forEach(function (con) { // close all the connections
          con && con.client && con.client.readyForQuery && con.client.end();
          con && con.done && con.done();
        })
        server.log(['info', pkg.name], 'DB Connection Closed');
      });
    }
    if(PG_CON.length === 0) {
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        PG_CON.push({ client: client, done: done});
        assign_connection(request, reply);
      });
    }
    else {
      assign_connection(request, reply);
    }
  });
  next();
};

exports.register.attributes = {
  pkg: pkg
};
