'use strict';
var repository = require('../lib/persistenceService'),
	cacheService = require('../lib/cacheService');

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
		return res.json({ err: 'You do not have permission to update this record.' });
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

	},
	update: function (req, res) {

	},
	destroy: function (req, res) {

	}
};