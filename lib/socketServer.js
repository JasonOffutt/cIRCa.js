'use strict';

var SocketServer = (function () {
	var io,
		sessionStore,
		redis = require('redis'),
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

					// In the current version of Connect, the `cookie` module is needed, as the
					// Connect developers have removed support from connect.utils.parseCookie
					data.cookie = cookieParser.parse(data.headers.cookie);

					// We need to parse a second time in order to verify that the cookie has been signed
					// correctly by Connect before we can send it through to the session store.
					data.cookie = connect.utils.parseSignedCookies(data.cookie, secret);
					sessionId = data.cookie['connect.sid'];
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
						sub = redis.createClient();

					if (session.auth && session.auth.user) {
						socket.emit('connected', { user: session.auth.user });
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
		configure: function (options, salt) {
			io = require('socket.io').listen(options.server);
			sessionStore = options.sessionStore;
			//redis = options.redisClients;
			secret = salt;
			return this;
		},
		start: function () {
			configure();
		}
	};
} ());

module.exports = SocketServer;