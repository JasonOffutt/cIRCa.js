'use strict';
var repository = require('../lib/persistenceService'),
	cacheService = require('../lib/cacheService'),
	conf = require('../lib/conf').appSettings,
	_ = require('underscore')._,
	errResponse = { success: false, err: 'Unable to perform the requested operation.' };

exports.users = {
	list: function (req, res) {

	},
	get: function (req, res) {

	},
	create: function (req, res) {

	},
	update: function (req, res) {
		var session = req.session,
			id = req.body._id,
			onCacheSave = function (err, user) {
				if (err) {
					console.log(err);
				}
			},
			onDbSave = function (err, user) {
				cacheService.updateUser(req, user, onCacheSave);
			};

		if (session.auth.user._id === id) {
			repository.users.save(req.body, onDbSave);

			// TODO: Should we be more pessimistic and move this return into a callback?
			res.status(200);
			return res.json({ success: true });
		}

		res.status(403);
		return res.json(errResponse);
	},
	destroy: function (req, res) {

	}
};

exports.bots = {
	list: function (req, res) {

	},
	get: function (req, res) {

	},
	create: function (req, res) {
		var session = req.session,
			defaults = {
				isActive: true,
				isRunning: false,
				retryCount: 0,
				maxRetries: conf.maxIrcJoinRetries,
			},
			bot = _.extend(defaults, req.body),
			onCacheSave = function (err, user) {
				if (err) {
					console.log(err);
				}
			},
			onDbSave = function (err, bot, user) {
				res.status(200);
				res.json({ success: true, _id: bot._id });
				cacheService.updateUser(req, user, onCacheSave)
			};

		delete bot._csrf;

		if (session.auth.user._id === bot.userId) {
			repository.bots.create(bot.userId, bot, onDbSave);
		} else {
			res.status(403);
			return res.json(errResponse);
		}
	},
	update: function (req, res) {
		var session = req.session,
			bot = req.body,
			onCacheSave = function (err, user) {
				if (err) {
					console.log(err);
				}
			},
			onDbSave = function (err, user) {
				res.status(200);
				res.json({ success: true });
				cacheService.updateUser(req, user, onCacheSave);
			};

		delete bot._csrf;

		if (session.auth.user._id === bot.userId) {
			repository.bots.update(bot.userId, bot, onDbSave);
		} else {
			res.status(403);
			return res.json(errResponse);
		}
	},
	destroy: function (req, res) {
		var session = req.session,
			botId = req.params.id,
			onCacheSave = function (err, user) {
				if (err) {
					console.log(err);
				}
			},
			onDbSave = function (err, user) {
				if (err) {
					console.log(err);
					res.status(403);
					return res.json(errResponse)
				}

				res.status(200);
				res.json({ success: true });
				cacheService.updateUser(req, user, onCacheSave);
			};

		repository.bots.delete(session.auth.user._id, botId, onDbSave);
	}
};