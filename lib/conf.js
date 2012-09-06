'use strict';

exports.auth = {
	facebook: {
		apiKey: '211766038953151',
		apiSecret: 'd6ba602d7a2c6e4182e71a2e4e1df10d',
		scope: 'email'
	},
	twitter: {
		apiKey: 'c9Xot4pHcclchGcGz9IgsA',
		apiSecret: 'eFhC7HpvYKeWBefHKThgSPN5SzeacPAhKTBEiMUNlY4'
	},
	google: {
		apiKey: '175119704444.apps.googleusercontent.com',
		apiSecret: 'uJvRXQ7za7qLVp_X28QCssmj',
		scope: 'https://www.googleapis.com/auth/userinfo.profile'
	}
};

exports.web = {
	csrfSalt: 'keyboardcat'
};

exports.redis = {
	host: 'localhost',
	port: 6379,
	password: ''
};

exports.mongo = {
	host: 'localhost',
	port: 27017,
	db: 'circa',
	password: ''
};

exports.smtp = {};

exports.appSettings = {
	maxIrcJoinRetries: 5
}