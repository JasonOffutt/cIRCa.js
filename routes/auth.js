'use strict';
var authService = require('../lib/authService');

// Good writeup on Twitter OAuth found here: 
// 	http://moonlitscript.com/post.cfm/how-to-use-oauth-and-twitter-in-your-node-js-expressjs-app/

// Module code/docs found here: https://github.com/ciaranj/node-oauth

// GET /auth/twitter
exports.twitterAuth = function (req, res) {
	authService.login('twitter', function (err, oauth_token, oauth_token_secret, results) {
		if (err) {
			console.log(err);
		} else {
			req.session.oauth = {
				token: oauth_token,
				token_secret: oauth_token_secret
			};
			res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
		}
	});
};

exports.twitterCallback = function (req, res) {
	if (!req.session.oauth) {
		return next(new Error('Are you lost?'));
	}

	req.session.oauth.verifier = req.query.oauth_verifier;
	var oauth = req.session.oauth;
	authService.authToken(
		'twitter',
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

// GET /auth/facebook
exports.facebookAuth = function (req, res) {
	// TODO: Handle this route with a redirect?
};

// GET /auth/google
exports.googleAuth = function (req, res) {
	authService.login('google', function (err, oauth_token, oauth_token_secret, results) {
		if (err) {
			console.log(err);
		} else {
			req.session.oauth = {
				token: oauth_token,
				token_secret: oauth_token_secret
			};
			res.redirect('https://www.google.com/accounts/OAuthAuthorizeToken?oaut_token=' + oauth_token);
		}
	});
};

exports.googleCallback = function (req, res) {
	if (!req.session.oauth) {
		return next(new Error('Are you lost?'));
	}

	req.session.oauth.verifier = req.query.oauth_verifier;
	var oauth = req.session.oauth;
	oauthService.authToken(
		'google',
		{
			token: oauth.token,
			token_secret: oauth.token_secret,
			verifier: oauth: verifier
		}, 
		function (err, oauth_access_token, oauth_access_token_secret, results) {
			if (err) {
				console.log(err);
			} else {
				req.session.oauth.access_token = oauth_access_token;
				res.redirect('/bots');
			}
		}
	);
};
