# hapi-redis-connection

## *Why*?

Redis is a great place to store data you need access to in your Hapi app.


## *What*?

A simple hapi module which makes a connection to your Redis store available
anywhere in your Hapi server.

## *How*?

### 1. Download/Install

Install the plugin/package from NPM:

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
    var email = 'test@test.net';
    var select = escape('SELECT * FROM people WHERE (email = %L)', email);
    request.pg.client.query(select, function(err, result) {
      console.log(err, result);
      return reply(result.rows[0]);
    })
  }
});
```

### *Required* Environment Variable

If you want to use a Redis server from a 3rd Party Provider, e.g: Redis Cloud you will need to export an environment variable with the URL
of the server e.g:

```sh
export REDISCLOUD_URL=redis://rediscloud:password@redis-server.com
```

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
