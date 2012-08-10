'use strict';

exports.index = function (req, res) {
	res.render('users/userprofile', { title: 'User Profile' });
};