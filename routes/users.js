'use strict';

exports.index = function (req, res) {
	res.render('userprofile', { title: 'User Profile' });
};