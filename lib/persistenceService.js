'use strict';

var PersistenceService = (function () {
	var mongoose = require('mongoose'),
		config = require('./conf').mongo,
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		_ = require('underscore')._,
		db = mongoose.createConnection(config.host, config.db, config.port);

	db.on('error', console.error.bind(console, 'connection error:'));

	var chatLogSchema = new Schema({
			userId: ObjectId,
			botId: ObjectId,
			from: String,
			to: String,
			message: String,
			date: Date
		}),

		botSchema = new Schema({
			userId: ObjectId,
			server: String,
			name: String,
			isRunning: Boolean,
			isActive: Boolean,
			retryCount: Number,
			maxRetries: Number,
			channels: [String]
			//channels: [chatLogSchema]
			//channels: [{ type: Schema.Types.ObjectId, ref: 'ChatLog' }]
		}),

		userSchema = new Schema({
			//id: ObjectId,
			facebookId: String,
			twitterId: String,
			googleId: String,
			email: String,
			registeredOn: Date,
			lastLoggedIn: Date,
			isActive: Boolean,
			bots: [botSchema]
		}),
		ChatLog = db.model('ChatLog', chatLogSchema),
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
				return User.findById(id, callback);
			},
			save: function (data, callback) {
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
					return callback(null, user);
				});
			}
		},
		bots: {
			findByUserId: function (id, callback) {
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
					callback(null, bot, user);
				});
			},
			update: function (userId, botData, callback) {
				return User.findById(userId, function (err, user) {
					if (err) {
						return callback(err);
					}

					var botId = botData._id,
						bot = user.bots.id(botId);

					//delete botData._id;
					bot = _.extend(bot, botData);
					user.save();
					callback(null, user);
				});
			},
			delete: function (userId, botId, callback) {
				return User.findById(userId, function (err, user) {
					if (err) {
						return callback(err);
					}

					var bot = user.bots.id(botId);

					if (!bot) {
						return callback('Bot not found');
					}

					bot.remove();
					user.save();
					callback(null, user);
				});
			}
		}
	};
} ());

module.exports = PersistenceService;