'use strict';

var SocketServer = (function () {
	var io,
		sessionStore,
		redis,
		secret,
		cookieParser = require('cookie'),
		connect = require('connect'),
		configure = function () {
			io.configure(function () {
				io.set('authorization', function (data, callback) {
					var sessionId;
					if (!data.headers.cookie) {
						return callback(new Error('No cookie transmitted'), false);
					}

					data.cookie = cookieParser.parse(data.headers.cookie);
					data.cookie = connect.utils.parseSignedCookies(data.cookie, secret);
					sessionId = data.cookie['connect.sid'];
					console.log(sessionId);
					sessionStore.get(sessionId, function (err, session) {
						if (err) {
							return callback(new Error('Error in session store.'), false);
						} else if (!session) {
							return callback(new Error('Session not found.'), false);
						}

						data.session = session;
						return callback(null, true);
					});
				});

				io.sockets.on('connection', function (socket) {
					var sessionId = socket.handshake;
					socket.emit('connected', { message: 'Welcome to cIRCa!' });

					// TODO: Listen for `message` events from the redis publisher, then emit
					// messages to the client.
				});
			});
		};

	return {
		init: function (options, salt) {
			io = require('socket.io').listen(options.server);
			sessionStore = options.sessionStore;
			redis = options.redisClients;
			secret = salt;
			return this;
		},
		start: function () {
			configure();
		}
	};
} ());

module.exports = SocketServer;