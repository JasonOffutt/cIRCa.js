'use strict';

var everyauth = require('everyauth'),
	config = require('./conf'),
	AuthService = (function () {

		// TODO Remove the below code and replace with persistence solution to store user
		// info, status, etc.
		var usersById = {};
		var nextUserId = 0;
		var usersByFbId = {};
		var usersByTwitId = {};
		var usersByGoogleId = {};

		function addUser (source, sourceUser) {
			var user;
			if (arguments.length === 1) { // password-based
				user = sourceUser = source;
				user.id = ++nextUserId;
				return usersById[nextUserId] = user;
			} else { // non-password-based
				user = usersById[++nextUserId] = {id: nextUserId};
				user[source] = sourceUser;
			}
			return user;
		}

		var onAuthError = function (req, res) {
				// TODO: Handle case where either authentication fails, or user declines permissions...
			},
			onAuthSuccess = function (session, accessToken, tokenSecret, user) {
				// TODO: Handle all use cases of successful login attempts...
			},
			initFacebook = function () {
				everyauth.facebook
					.appId(config.facebookApiKey)
					.appSecret(config.facebookApiSecret)
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, facebookUser) {
						// TODO: Delegate call to persistence service to create user if necessary
						return usersByFbId[facebookUser.id] || (usersByFbId[facebookUser.id] = addUser('facebook', facebookUser));
					})
					.redirectPath('/bots');
			},
			initTwitter = function () {
				everyauth.twitter
					.consumerKey(config.twitterApiKey)
					.consumerSecret(config.twitterApiSecret)
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, twitterUser) {
						// TODO: Delegate call to persistence service to create user if necessary
						return usersByTwitId[twitterUser.id] || (usersByTwitId[twitterUser.id] = addUser('twitter', twitterUser));
					})
					.redirectPath('/bots');
			},
			initGoogle = function () {
				everyauth.google
					.appId(config.googleApiKey)
					.appSecret(config.googleApiSecret)
					.scope(config.googleScope)
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, googleUser) {
						// TODO: Delegate call to persistence service to create user if necessary
						return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
					})
					.redirectPath('/bots');
			};


		return {
			initProviders: function () {
				everyauth.everymodule
					.findUserById(function (id, callback) {
						callback(null, usersById[id]);
					});

				initFacebook();
				initTwitter();
				initGoogle();
			},

			preEveryAuth: function () {
				return function (req, res, next) {
					var sess = req.session,
						auth = sess.auth,
						ea = { loggedIn: !!(auth && auth.loggedIn) };

					// Copy the session.auth properties over
					for (var k in auth) {
						ea[k] = auth[k];
					}

					if (everyauth.enabled.password) {
						// Add in access to loginFormFieldName() + passwordFormFieldName()
						ea.password || (ea.password = {});
						ea.password.loginFormFieldName = everyauth.password.loginFormFieldName();
						ea.password.passwordFormFieldName = everyauth.password.passwordFormFieldName();
					}

					res.locals.everyauth = ea;

					next();
				}
			},

			postEveryAuth: function () {
				var userAlias = everyauth.expressHelperUserAlias || 'user';
				return function(req, res, next) {
					res.locals.everyauth.user = req.user;
					res.locals[userAlias] = req.user;
					next();
				};
			}
		};
	} ());

module.exports = AuthService;