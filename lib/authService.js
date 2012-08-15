'use strict';

var everyauth = require('everyauth'),
	config = require('./conf').auth,
	repository = require('./persistenceService'),
	AuthService = (function () {

		var onAuthError = function (req, res) {
				// TODO: Handle case where either authentication fails, or user declines permissions...
			},
			authenticate = function (session, user, promise) {
				repository.users.loginOrRegister(user, function (err, result) {
					if (err) {
						promise.fail(err);
					}
					
					session.auth = session.auth || {};
					session.auth.user = result;
					promise.fulfill(result);
				});
			},
			initFacebook = function () {
				everyauth.facebook
					.appId(config.facebook.apiKey)
					.appSecret(config.facebook.apiSecret)
					.scope(config.facebook.scope)
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, facebookUser) {
						var promise = this.Promise(),
							userData = {
							type: 'facebook',
							name: facebookUser.name,
							facebookId: facebookUser.id,
							email: facebookUser.email,
							isActive: true
						};
						authenticate(session, userData, promise);
						return promise;
					})
					.redirectPath('/bots');
			},
			initTwitter = function () {
				everyauth.twitter
					.consumerKey(config.twitter.apiKey)
					.consumerSecret(config.twitter.apiSecret)
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, twitterUser) {
						var promise = this.Promise(),
							userData = {
								type: 'twitter',
								name: twitterUser.name,
								twitterId: twitterUser.id_str,
								isActive: true
							};
						authenticate(session, userData, promise);
						return promise;
					})
					.redirectPath('/bots');
			},
			initGoogle = function () {
				everyauth.google
					.appId(config.google.apiKey)
					.appSecret(config.google.apiSecret)
					.scope(config.google.scope)
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, googleUser) {
						console.log(googleUser);
						var promise = this.Promise(),
							userData = {
								type: 'google',
								name: googleUser.name,
								googleId: googleUser.id,
								//email: googleUser.email,
								isActive: true
							};
						authenticate(session, userData, promise);
						return promise;
					})
					.redirectPath('/bots');
			};


		return {
			initProviders: function () {
				everyauth.everymodule
					.findUserById(function (id, callback) {
						repository.users.getById(id, function (err, user) {
							if (err) {
								return callback(err);
							}

							return callback(null, user);
						});
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