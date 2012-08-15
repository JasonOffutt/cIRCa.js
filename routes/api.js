'use strict';
var repository = require('../lib/persistenceService');

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

		if (session.auth.user._id === id) {
			// TODO: Update user model in persistence layer... 
			repository.users.save(req.body, function (err, user) {
				console.log(user);
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