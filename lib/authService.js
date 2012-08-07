'use strict';

var everyauth = require('everyauth'),
	AuthService = (function () {

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
					.appId('211766038953151')
					.appSecret('d6ba602d7a2c6e4182e71a2e4e1df10d')
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, facebookUser) {
						var promise = this.Promise();
						promise.fulfill(facebookUser);
						return promise;
					})
					.redirectPath('/bots');
			},
			initTwitter = function () {
				everyauth.twitter
					.consumerKey('c9Xot4pHcclchGcGz9IgsA')
					.consumerSecret('eFhC7HpvYKeWBefHKThgSPN5SzeacPAhKTBEiMUNlY4')
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, twitterUser) {
						// TODO: Delegate call to persistence service to create user if necessary
						//var promise = this.Promise();
						//promise.fulfill({ name: twitterUser.name, twitterId: twitterUser.id_str });
						//return promise;
						return usersByTwitId[twitterUser.id] || (usersByTwitId[twitterUser.id] = addUser('twitter', twitterUser));
					})
					.redirectPath('/bots');
			},
			initGoogle = function () {
				everyauth.google
					.appId('175119704444.apps.googleusercontent.com')
					.appSecret('uJvRXQ7za7qLVp_X28QCssmj')
					.scope('https://www.googleapis.com/auth/userinfo.profile')
					.handleAuthCallbackError(onAuthError)
					.findOrCreateUser(function (session, accessToken, tokenSecret, googleUser) {
						var promise = this.Promise();
						promise.fulfill(googleUser);
						return promise;
					})
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
			}
		};
	} ());

module.exports = AuthService;