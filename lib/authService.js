'use strict';

var AuthService = (function () {
	var OAuth = requrie('oauth').OAuth,
		providers = {
			twitter: new OAuth(
				'https://api.twitter.com/oauth/request_token',
				'https://api.twitter.com/oauth/access_token',
				'c9Xot4pHcclchGcGz9IgsA',
				'eFhC7HpvYKeWBefHKThgSPN5SzeacPAhKTBEiMUNlY4',
				'1.0',
				'http://lvh.me:3000/auth/twitter/callback',
				'HMAC-SHA1'
			),
			google: new OAuth(
				'https://www.google.com/accounts/OAuthGetRequestToken',
				'https://www.google.com/accounts/OAuthAuthorizeToken',
				'anonymous',
				'anonymous',
				'1.0A',
				'http://lvh.me:3000/auth/google/callback',
				'HMAC-SHA1'
			)
		};

	return {
		login: function (provider, callback) {
			providers[provider].getOAuthRequestToken(callback);
		},

		authToken: function (provider, options, callback) {
			proverders[provider].getOAuthAccessToken(
				options.token, 
				options.token_secret, 
				options.verifier, 
				callback
			);
		},

		logout: function () {

		}
	};
} ());

module.exports = AuthService;