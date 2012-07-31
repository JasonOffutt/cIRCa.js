'use strict';

var IrcServer = (function () {
	var irc = require('irc'),	
		redis,
		socketServer,
		createBot = function () {
			var bot = new irc.Client('irc.freenode.net', 'cIRCa', {
				    debug: true,
				    channels: ['#RockChMS'],
				}),
				stdin = process.openStdin();

			bot.addListener('message', function (from, to, message) {
				var msg = from + ' => ' + to + ': ' + message
			    console.log(msg);

			    // TODO: Publish `message` events through redis publisher channel
			    //redisClients.pub.publish('irc', msg);

			    // TODO: Write message to database
			});

			stdin.on('data', function (chunk) {
				bot.say('#RockChMS', chunk);
			});
		};

	return {
		init: function (options) {
			redis = options.redisClients;
			createBot();
			return this;
		}
	};
} ());

module.exports = IrcServer;