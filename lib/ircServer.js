'use strict';

var IrcServer = (function () {
	var irc = require('irc'),	
		redis = require('redis'),
		config = require('./conf').redis,
		socketServer,
		createBot = function () {
			// TODO: Create a means here to join a specific server.
			var bot = new irc.Client('irc.freenode.net', 'cIRCa', {
				    debug: true,
				    channels: ['#RockChMS'],
				}),
				stdin = process.openStdin(),
				pub = redis.createClient(config.port, config.host);
			pub.auth(config.password);

			// TODO: Create a more robust system for pub/sub. Consider publishing with a
			// `server#channel` key set so messages aren't handled erroneously.

			bot.addListener('message', function (from, to, message) {
				// TODO: Put some more attention toward creating an object/model
				// for a message that will ultimately be saved to to a database.
				var msg = from + ' => ' + to + ': ' + message
				pub.publish('chat', msg);
			});

			// TODO: Listen for other IRC events, handle any IRC specific actions, then 
			// publish events through Redis so other areas of the app can respond accordingly
			// * Join
			// * Quit
			// * Kick
			// * Part
			// * Error

			// Delete this code later... just proof of concept... no need to send IRC messages through CLI for MVP
			// stdin.on('data', function (chunk) {
			// 	bot.say('#RockChMS', chunk);
			// 	redis.pub.publish('chat', chunk);
			// });
		};

	return {
		configure: function (options) {
			return this;
		},
		start: function () {
			createBot();
		}
	};
} ());

module.exports = IrcServer;