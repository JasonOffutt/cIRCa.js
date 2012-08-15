'use strict';

var SocketServer = (function () {
	var io,
		sessionStore,
		redis = require('redis'),
		cookieParser = require('cookie'),
		connect = require('connect'),
		config = require('./conf').redis,
		cacheService = require('./cacheService'),
		configure = function () {
			io.configure(function () {
				io.enable('browser client minification');
				io.enable('browser client etag');
				io.enable('browser client gzip');
				io.set('log level', 1);
				io.set('authorization', function (data, callback) {
					var sessionId;
					if (!data.headers.cookie) {
						return callback(new Error('No cookie transmitted'), false);
					}

					sessionId = cacheService.findSessionKey(data);
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
					var request = socket.handshake,
						session = request.session,
						sub = redis.createClient(config.port, config.host);
					sub.auth(config.password);

					if (session.auth && session.auth.user) {
						socket.emit('connected', { user: request.session.auth.user });
					} else {
						socket.emit('connected', { message: 'Welcome to cIRCa!' });
					}

					// TODO: Create a more robust system for pub/sub. Consider publishing with a
					// `server#channel` key set so messages aren't handled erroneously.

					sub.on('message', function (channel, message) {
						socket.emit(channel, { message: message });
					});

					sub.subscribe('chat');
				});

				io.sockets.on('disconnect', function () {
					sub.unsubscribe('chat');
					sub.quit();
				});
			});
		};

	return {
		configure: function (options) {
			io = require('socket.io').listen(options.server);
			sessionStore = options.sessionStore;
			return this;
		},
		start: function () {
			configure();
		}
	};
} ());

module.exports = SocketServer;