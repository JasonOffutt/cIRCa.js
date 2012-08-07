'use strict';

var mongoose = require('mongoose'),
	db = mongoose.connect('localhost', 'circa');

db.on('error', console.error.bind(console, 'db connection error: '));

var Users = new mongoose.Schema({
	id: Number,
	facebookId: String,
	twitterId: String,
	googleId: String,
	email: String,
	registeredOn: Date,
	lastLoggedIn: Date,
	isActive: Boolean
});