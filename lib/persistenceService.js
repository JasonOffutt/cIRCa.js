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
			server: String,
			name: String,
			isRunning: Boolean,
			isActive: Boolean,
			retryCount: Number,
			maxRetries: Number,
			channels: [channelSchema]
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

	userSchema.statics.getById = function (id, callback) {
		return this.model.findById(id, callback);
	};

	userSchema.statics.getByTwitterId = function (id, callback) {
		return this.model('User').find({ twitterId: id }, callback);
	};

	userSchema.statics.getByFacebookId = function (id, callback) {
		return this.model('User').find({ facebookId: id }, callback);
	};

	userSchema.statics.getByGoogleId = function (id, callback) {
		return this.model('User').find({ googleId: id }, callback);
	};

	channelSchema.statics.findByDate = function (date, callback) {
		return this.model('ChannelLog').find({ date: date }, callback);
	};

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
			getByTwitterId: function (id, callback) {
				return User.getByTwitterId(id, callback);
			},
			getByFacebookId: function (id, callback) {
				return User.getByFacebookId(id, callback);
			},
			getByGoogleId: function (id, callback) {
				return Uer.getByGoogleId(id, callback);
			},
			getById: function (id, callback) {
				return User.getById(id, callback);
			}
		}
		
	};
} ());

module.exports = PersistenceService;