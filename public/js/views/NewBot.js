define(['underscore', 'backbone', 'templateManager', 'bot'], function (_, Backbone, TemplateManager, Bot) {
	'use strict';

	var NewBot = Backbone.View.extend({
		template: 'bot-new',
		className: 'new-bot',
		events: {
			'click #save': 'saveClicked',
			'click .cancel': 'cancelClicked'
		},
		initialize: function (options) {
			this.ev = options.ev;
			this.model = new Bot();
		},
		render: function () {
			var that = this;
			TemplateManager.get(this.template, function (tmp) {
				var html = tmp(that.model.toJSON());
				that.$el.html(html);
			});

			return this;
		},
		saveClicked: function (e) {
			// TODO: pass through attrs to presenter to send model data to server
			return false;
		},
		cancelClicked: function (e) {
			this.ev.trigger('bots:list', $(e.currentTarget).attr('href'));
			return false;
		}
	});

	return NewBot;
});