define(['underscore', 'backbone', 'bot'], function (_, Backbone, Bot) {
	'use strict';

	var User = Backbone.Model.extend({
		idAttribute: '_id',
		urlRoot: '/api/v1/users',
		initialize: function (options) {
			_.bindAll(this);
		},
		getBot: function (id) {
			var bots = this.get('bots') || [],
				bot = null;

			for (var i = 0; i < bots.length; i++) {
				bot = bots[i];

				if (bot && bot._id === id) {
					return bot;
				}
			}
		},
		addBot: function (obj) {
			var bot = obj instanceof Backbone.Model ? obj.toJSON() : obj;
			this.get('bots').push(bot);
		},
		updateBot: function (id, attrs) {
			var bots = this.get('bots') || [],
				bot;

			for (var i = 0; i < bots.length; i++) {
				bot = bots[i];

				if (bot._id === id) {
					bot = _.extend(bot, attrs);
					break;
				}
			}
		},
		removeBot: function (id) {
			var bots = this.get('bots') || [],
				bot;

			for (var i = 0; i < bots.length; i++) {
				bot = bots[i];

				if (bot._id === id) {
					bots.pop(bot);
					bot = null;
					break;
				}
			}
		}
	});

	return User;
});