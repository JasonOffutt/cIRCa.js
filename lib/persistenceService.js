'use strict';

var mongoose = require('mongoose'),
	db = mongoose.connect('localhost', 'circa');

db.on('error', console.error.bind(console, 'db connection error: '));

var channelSchema = new mongoose.Schema({
		id: Number,
		from: String,
		to: String,
		message: String,
		date: Date
	}),

	botSchema = new mongoose.Schema({
		id: Number,
		server: String,
		name: String,
		isRunning: Boolean,
		isActive: Boolean,
		retryCount: Number,
		maxRetries: Number,
		channels: [ChannelLogs]
	}),

	userSchema = new mongoose.Schema({
		id: Number,
		facebookId: String,
		twitterId: String,
		googleId: String,
		email: String,
		registeredOn: Date,
		lastLoggedIn: Date,
		isActive: Boolean,
		bots: [Bots]
	});

userSchema.methods.getByTwitterId = function (id) {
	return this.model('User').find({ twitterId: id });
};

userSchema.methods.getByFacebookId = function (id) {
	return this.model('User').find({ facebookId: id });
};

userSchema.methods.getByGoogleId = function (id) {
	return this.model('User').find({ googleId: id });
};

channelSchema.methods.findByDate = function (cb) {
	return this.model('ChannelLog').find({ date: this.date }, cb);
};

var ChannelLog = mongoose.model('ChannelLog', channelSchema),
	Bot = mongoose.model('Bot', botSchema),
	User = mongoose.model('User', userSchema);