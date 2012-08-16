define(['underscore', 'backbone', 'templateManager'], function (_, Backbone, TemplateManager) {
	'use strict';

	var BotList = Backbone.View.extend({
		template: 'bot-list',
		className: 'bot-list',
		events: {
			'click .new-bot': 'newBotClicked',
			'click .bot': 'botClicked'
		},
		initialize: function (options) {
			this.ev = options.ev;
			_.bindAll(this);
		},
		render: function () {
			var that = this;
			TemplateManager.get(this.template, function (tmp) {
				var html = tmp(that.model.toJSON());
				that.$el.html(html);
			});

			return this;
		},
		newBotClicked: function (e) {
			this.ev.trigger('bots:new', $(e.currentTarget).attr('href'));
			return false;
		},
		botClicked: function (e) {
			this.ev.trigger('bots:show', $(e.currentTarget).attr('href'));
			return false;
		}
	});

	return BotList;
});