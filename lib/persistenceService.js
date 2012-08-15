'use strict';

var PersistenceService = (function () {
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		_ = require('underscore')._,
		db = mongoose.createConnection('localhost', 'circa');

	db.on('error', console.error.bind(console, 'connection error:'));

	var channelSchema = new Schema({
			id: ObjectId,
			from: String,
			to: String,
			message: String,
			date: Date
		}),

		botSchema = new Schema({
			id: ObjectId,
			userId: ObjectId,
			server: String,
			name: String,
			isRunning: Boolean,
			isActive: Boolean,
			retryCount: Number,
			maxRetries: Number,
			//channels: [channelSchema]
			channels: [{ type: Schema.Types.ObjectId, ref: 'ChannelLog' }]
		}),

		userSchema = new Schema({
			id: ObjectId,
			facebookId: String,
			twitterId: String,
			googleId: String,
			email: String,
			registeredOn: Date,
			lastLoggedIn: Date,
			isActive: Boolean,
			bots: [botSchema]
		}),
		ChannelLog = db.model('ChannelLog', channelSchema),
		Bot = db.model('Bot', botSchema),
		User = db.model('User', userSchema);

	return {
		users: {
			loginOrRegister: function (userData, callback) {
				var params = {};
				params[userData.type + 'Id'] = userData[userData.type + 'Id'];
				delete userData.type;

				User.find(params, function (err, users) {
					var currentUser = _.first(users);

					if (err) {
						return callback(err);
					}

					if (currentUser) {
						currentUser.lastLoggedIn = new Date();
						currentUser.save();
						return callback(null, currentUser);
					}

					var data = _.extend(userData, { lastLoggedIn: new Date(), registeredOn: new Date() }),
						newUser = new User(data);
					
					newUser.save(function (err) {
						if (err) {
							return callback(err);
						}

						return callback(null, newUser);
					});
				});
			},
			getById: function (id, callback) {
				return User.getById(id, callback);
			},
			save: function (data) {
				User.findById(data._id, function (err, user) {
					if (err) {
						return callback(err);
					}

					if (!user) {
						return callback(new Error('User not found'));
					}

					user.name = data.name;
					user.email = data.email;
					user.save();
				});
			}
		},
		bots: {
			findByUserId: function (id, callback) {
				//return Bot.find({ userId: id }, callback);
				return Users.findById(id, function (err, user) {
					if (err) {
						callback(err);
					} else {
						callback(null, user.bots);
					}
				});
			},
			getById: function (id, callback) {
				return Bot.findById(id, callback);
			},
			create: function (id, data, callback) {
				return User.findById(id, function (err, user) {
					if (err) {
						return callback(err);
					}

					var bot = new Bot(data);
					user.bots.push(bot);
					user.save();
					callback(null, bot);
				});
			}
		}
	};
} ());

module.exports = PersistenceService;