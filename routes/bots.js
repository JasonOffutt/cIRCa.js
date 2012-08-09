'use strict';

var botRepository = require('../lib/persistenceService').bots;

exports.index = function (req, res) {
	botRepository.findByUserId(req.session.userId, function (err, bots) {
		res.render('botlist', { title: 'Bot List', bots: bots });
	});
};

exports.new = function (req, res) {
	res.render('newbot', { title: 'New Bot' })
};