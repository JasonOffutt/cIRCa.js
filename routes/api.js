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
			id = req.body._id;

		// console.log('*** Logging Cached User Before Save ***')
		// console.log(req.session.auth.user);

		if (session.auth.user._id === id) {
			repository.users.save(req.body, function (err, user) {
				//console.log(req);

				cacheService.updateUser(req, user, function (er, user) {
					if (er) {
						console.log(er);
					}

					console.log(user);
				});

				// Make sure the cached user record gets updated in session after successful save.
				// Setting this here, but it doesn't seem to propagate to redis...
				// Consider publishing to redis and update elsewhere?
				// session.auth.user = user;
				// console.log('*** Acutal User Saved To Database ***');
				// console.log(user);
				// console.log('*** User Being Saved Back To Cache ***');
				// console.log(session.auth.user);
			});

			res.status(200);
			return res.json({ success: true });
		}

		// TODO: Return a 403 status code...
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