'use strict';

exports.index = function (req, res) {
	res.render('botlist', { title: 'Bot List' });
};