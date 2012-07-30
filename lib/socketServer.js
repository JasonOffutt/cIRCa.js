'use strict';

var SocketServer = (function () {
	var io,
		session,
		redisClients,
		parseCookie = require('connect').utils.parseCookie,
		configure = function () {
			io.configure(function () {
				io.set('authorization', function (data, callback) {
					var sessionId;
					if (data.headers.cookie) {
						data.cookie = parseCookie(data.headers.cookie);
						sessionId = data.cookie['connect.sid'];
						sessionStore.get(sessionId, function (err, session) {
							if (err || !session) {
								console.log('**** No Session Found ****');
								console.log('err: ' + err);
								console.log('session: ' + session);
								callback(new Error('**** /No Session Found ****'));
							} else {
								callback(null, true);
							}
						});
					} else {
						callback(new Error('No cookie transmitted'));
					}
				});

				io.sockets.on('connection', function (socket) {
					//var sessionId = socket.handshake.cookie['connect.sid'];
					socket.emit('connected', { message: 'Welcome to cIRCa!' });
				});
			});
		};

	return {
		init: function (server, sessionStore, redis) {
			io = require('socket.io').listen(server);
			session = sessionStore;
			redisClients = redis;
			return this;
		},
		start: function () {
			configure();
		}
	};
} ());

module.exports = SocketServer;