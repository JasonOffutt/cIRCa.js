define(['backbone', 'bot'], function (Backbone, Bot) {
	'use strict';

	var BotCollection = Backbone.Collection.extend({
		model: Bot
	});

	return BotCollection;
})