# hapi-redis-connection

## *Why*?

Redis is a great place to store data you need access to in your Hapi app.


## *What*?

A simple hapi module which makes a connection to your Redis store available
anywhere in your Hapi server.

## *How*?

## Install

Install the plugin/package from NPM:




### Implementation Notes

This package uses: [`redis-connection`](https://github.com/dwyl/redis-connection)
which in turn exposes [`node_redis`](https://github.com/NodeRedis/node_redis)
(*feature complete Redis client*)
