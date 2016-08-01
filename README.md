# hapi-redis-connection

[![Build Status](https://travis-ci.org/dwyl/hapi-redis-connection.svg?branch=master)](https://travis-ci.org/dwyl/hapi-redis-connection)
[![codecov](https://codecov.io/gh/dwyl/hapi-redis-connection/branch/master/graph/badge.svg)](https://codecov.io/gh/dwyl/hapi-redis-connection)
[![Code Climate](https://codeclimate.com/github/dwyl/hapi-redis-connection/badges/gpa.svg)](https://codeclimate.com/github/dwyl/hapi-redis-connection)
[![dependencies Status](https://david-dm.org/dwyl/hapi-redis-connection/status.svg)](https://david-dm.org/dwyl/hapi-redis-connection)
[![devDependencies Status](https://david-dm.org/dwyl/hapi-redis-connection/dev-status.svg)](https://david-dm.org/dwyl/hapi-redis-connection?type=dev)

![dilbert_in-memory](https://cloud.githubusercontent.com/assets/194400/17288192/05bed3d6-57d4-11e6-8870-19548218ca9e.jpg)

## *Why*?

Redis is a *great* place to store data you need *fast* access to in your Hapi app. If you have many route handlers in separate files it can be *tedious* to `require()` (*or `import` if you prefer*) the `redis` module
and establish a connection in each one ... so we created a tiny Plugin
that gives you access to Redis in all your routes.


## *What*?

A simple hapi module which makes a connection to your Redis store available
anywhere in your Hapi server.

## *How*?

### 1. Download/Install

Install the plugin/package from NPM:

```sh
npm install hapi-redis-connection --save
```

### 2. *Intialise* the plugin in your Hapi Server

```js
server.register({ // register all your plugins
  register: require('hapi-redis-connection') // no options required
}, function (err) {
  if (err) {
    // handle plugin startup error
  }
});
```


### 3. *Use* `hapi-redis-connection` in your Route Handler

```js
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    request.redis.get('homepage', function(err, result) {
      console.log(err, result);
      return reply(result);
    });
  }
});
```

> If you want more usage examples, ask! :wink:

### Environment Variable

If you want to use a Redis server from a 3rd Party Provider, e.g: Redis Cloud you will need to export an environment variable with the URL
of the server e.g:

```sh
export REDISCLOUD_URL=redis://rediscloud:password@redis-server.com
```

If you do not set a `REDISCLOUD_URL` the plugin will attempt to connect
to redis on your localhost.


## Other Redis Providers?

At *present* we are using [Redis Cloud](https://github.com/dwyl/learn-redis#which-redis-as-a-service-heroku-addon)
for our Hapi apps because
they have a great service at an affordable price.

If you are planning on using another provider e.g. AWS ElastiCache (Redis),
***please let us know***! https://github.com/dwyl/redis-connection/issues

### Implementation Notes

This package uses: [`redis-connection`](https://github.com/dwyl/redis-connection)
which in turn exposes [`node_redis`](https://github.com/NodeRedis/node_redis)
(*feature complete & high performance Redis client*)

> Connecting to Redis Cloud is tested in: https://git.io/v6vTf
