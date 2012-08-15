'use strict';

var express = require('express'),
    redis = require('redis'),
    fs = require('fs'),
    http = require('http'),
    config = require('./lib/conf').redis,

    RedisStore = require('connect-redis')(express),
    redisClients = {
        //pub: redis.createClient(),
        //sub: redis.createClient(),
        cache: redis.createClient(config.port, config.host)
    },
    sessionStore = new RedisStore({ client: redisClients.cache }),

    webServer = require('./lib/webServer'),
    ircServer = require('./lib/ircServer'),
    socketServer = require('./lib/socketServer'),
    server = webServer.init({
        http: http,
        express: express,
    });
redisClients.cache.auth(config.password);
webServer.configure(__dirname, sessionStore).start();

socketServer.configure({
    server: server, 
    sessionStore: sessionStore, 
    redisClients: redisClients
});

ircServer.configure({ redisClients: redisClients }).start();
socketServer.start();
