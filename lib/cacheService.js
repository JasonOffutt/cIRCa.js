'use strict';

var redis = require('redis'),
	config = require('./conf'),
	cookieParser = require('cookie'),
	connect = require('connect');

var findSessionKey = function (req) {
	var cookie,
		key;

	// In the current version of Connect, the `cookie` module is needed, as the
	// Connect developers have removed support from connect.utils.parseCookie
	cookie = cookieParser.parse(req.headers.cookie);

	// We need to parse a second time in order to verify that the cookie has been signed
	// correctly by Connect before we can send it through to the session store.
	cookie = connect.utils.parseSignedCookies(cookie, config.web.csrfSalt);
	key = cookie['connect.sid'];
	return key;
};

exports.findSessionKey = findSessionKey;

exports.updateUser = function (req, user, callback) {
	var client = redis.createClient(config.redis.port, config.redis.host),
		key = 'sess:' + findSessionKey(req);
	client.auth(config.redis.password);

	client.get(key, function (err, result) {
		var session;

		if (err) {
			return callback(err);
		}

		session = JSON.parse(result);
		session.auth.user = user;
		client.set(key, JSON.stringify(session), function (er) {
			if (er) {
				console.log(er);
			}

			client.quit();
		});
	});
};