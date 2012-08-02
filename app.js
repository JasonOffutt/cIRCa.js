'use strict';

var SITE_SECRET = 'keyboardcat',
    express = require('express'),
    redis = require('redis'),
    fs = require('fs'),
    http = require('http'),

    RedisStore = require('connect-redis')(express),
    redisClients = {
        pub: redis.createClient(),
        sub: redis.createClient(),
        cache: redis.createClient()
    },
    sessionStore = new RedisStore({ client: redisClients.cache }),

    webServer = require('./lib/webServer'),
    ircServer = require('./lib/ircServer'),
    socketServer = require('./lib/socketServer'),
    server = webServer.init({
        http: http,
        express: express,
    });

webServer.configure(__dirname, sessionStore, SITE_SECRET).start();

socketServer.configure({
    server: server, 
    sessionStore: sessionStore, 
    redisClients: redisClients
}, SITE_SECRET);

//ircServer.configure({ redisClients: redisClients }).start();
socketServer.start();
