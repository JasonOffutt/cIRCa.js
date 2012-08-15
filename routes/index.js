'use strict';
/*
 * GET home page.
 */

exports.index = function (req, res) {
	res.render('index', { title: 'Welcome to cIRCa', csrf: req.session._csrf });
};