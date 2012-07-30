'use strict';

var IrcServer = (function () {
	var irc = require('irc'),	
		redisClients,
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

			    //redisClients.pub.publish('irc', msg);
			});

			stdin.on('data', function (chunk) {
				bot.say('#RockChMS', chunk);
			});
		};

	return {
		init: function (redis) {
			redisClients = redis;
			createBot();
			return this;
		}
	};
} ());

module.exports = IrcServer;