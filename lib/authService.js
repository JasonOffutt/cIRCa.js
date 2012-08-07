'use strict';

var everyauth = require('everyauth'),
	AuthService = (function () {
		var onAuthError = function (req, res) {
				// TODO: Handle case where either authentication fails, or user declines permissions...
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
						var promise = this.Promise();
						promise.fulfill(twitterUser);
						return promise;
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
				initFacebook();
				initTwitter();
			}
		};
	} ());

module.exports = AuthService;

// var AuthService = (function () {
// 	var OAuth = require('oauth').OAuth,
// 		providers = {
// 			twitter: new OAuth(
// 				'https://api.twitter.com/oauth/request_token',
// 				'https://api.twitter.com/oauth/access_token',
// 				'c9Xot4pHcclchGcGz9IgsA',
// 				'eFhC7HpvYKeWBefHKThgSPN5SzeacPAhKTBEiMUNlY4',
// 				'1.0',
// 				'http://lvh.me:3000/auth/twitter/callback',
// 				'HMAC-SHA1'
// 			),
// 			facebook: new OAuth(
// 				'',
// 				'',
// 				'211766038953151',
// 				'd6ba602d7a2c6e4182e71a2e4e1df10d',
// 				'2.0',
// 				'http://lvh.me:3000/auth/facebook/callback',
// 				'HMAC-SHA1'
// 			),
// 			google: new OAuth(
// 				'https://accounts.google.com/o/oauth2/auth',
// 				'https://www.google.com/accounts/OAuthAuthorizeToken',
// 				'175119704444.apps.googleusercontent.com',
// 				'uJvRXQ7za7qLVp_X28QCssmj',
// 				'2.0',
// 				'http://lvh.me:3000/auth/google/callback',
// 				'HMAC-SHA1'
// 			)
// 		};

// 	return {
// 		login: function (provider, callback) {
// 			providers[provider].getOAuthRequestToken(callback);
// 		},

// 		authToken: function (provider, options, callback) {
// 			providers[provider].getOAuthAccessToken(
// 				options.token, 
// 				options.token_secret, 
// 				options.verifier, 
// 				callback
// 			);
// 		},

// 		logout: function () {

// 		}
// 	};
// } ());

// module.exports = AuthService;