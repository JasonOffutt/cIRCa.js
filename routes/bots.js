'use strict';

var botRepository = require('../lib/persistenceService').bots;

exports.index = function (req, res) {
	if (!req.session.auth) {
		res.redirect('/');
	}

	botRepository.findByUserId(req.session.userId, function (err, bots) {
		res.render('bots/botlist', { title: 'Bot List', bots: bots });
	});
};

exports.new = function (req, res) {
	if (!req.session.auth) {
		res.redirect('/');
	}

	res.render('bots/new', { title: 'New Bot' })
};

exports.create = function (req, res) {
	if (!req.session.auth) {
		res.redirect('/');
	}
};

exports.get = function (req, res) {
	if (!req.session.auth) {
		res.redirect('/');
	}

	botRepository.findById(req.params.id, function (err, bot) {
		res.json(bot);
	});
};

exports.update = function (req, res) {
	if (!req.session.auth) {
		res.redirect('/');
	}
};

exports.destroy = function (req, res) {
	if (!req.session.auth) {
		res.redirect('/');
	}
};