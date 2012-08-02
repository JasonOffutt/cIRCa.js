'use strict';
var authService = require('../lib/authService');

// Good writeup on Twitter OAuth found here: 
// 	http://moonlitscript.com/post.cfm/how-to-use-oauth-and-twitter-in-your-node-js-expressjs-app/

// Module code/docs found here: https://github.com/ciaranj/node-oauth

// Twitter OAuth docs: https://dev.twitter.com/docs/auth/using-oauth
// Google OAuth 2.0 docs: https://developers.google.com/accounts/docs/OAuth2WebServer
// Facebook OAuth 2.0 docs: https://developers.facebook.com/docs/authentication/server-side/

var providerUrls = {
		twitter: 'https://twitter.com/oauth/authenticate?oauth_token=',
		facebook: '',
		google: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token='
	},
	handleAuthRequest = function (provider, req, res) {
		authService.login(provider, function (err, oauth_token, oauth_token_secret, results) {
			if (err) {
				console.log(err);
			} else {
				req.session.oauth = {
					token: oauth_token,
					token_secret: oauth_token_secret
				};
				res.redirect(providerUrls[provider] + oauth_token);
			}
		});
	},
	handleCallback = function (provider, req, res) {
		if (!req.session.oauth) {
			return next(new Error('Are you lost?'));
		}

		req.session.oauth.verifier = req.query.oauth_verifier;
		var oauth = req.session.oauth;
		authService.authToken(
			provider,
			{
				token: oauth.token,
				token_secret: oauth.token_secret,
				verifier: oauth.verifier
			},
			function (err, oauth_access_token, oauth_access_token_secret, results) {
				if (err) {
					console.log(err);
				} else {
					req.session.oauth.access_token = oauth_access_token;
					res.redirect('/bots');
				}
			});
	};

// GET /auth/twitter
exports.twitterAuth = function (req, res) {
	handleAuthRequest('twitter', req, res);
};

exports.twitterCallback = function (req, res) {
	handleCallback('twitter', req, res);
};

// GET /auth/facebook
exports.facebookAuth = function (req, res) {
	handleAuthRequest('facebook', req, res);
};

exports.facebookCallback = function (req, res) {
	handleCallback('facebook', req, res);
};

// GET /auth/google
exports.googleAuth = function (req, res) {
	handleAuthRequest('google', req, res);
};

exports.googleCallback = function (req, res) {
	handleCallback('google', req, res);
};
