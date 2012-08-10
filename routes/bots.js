'use strict';

var botRepository = require('../lib/persistenceService').bots;

exports.index = function (req, res) {
	botRepository.findByUserId(req.session.userId, function (err, bots) {
		res.render('bots/botlist', { title: 'Bot List', bots: bots });
	});
};

exports.new = function (req, res) {
	res.render('bots/newbot', { title: 'New Bot' })
};