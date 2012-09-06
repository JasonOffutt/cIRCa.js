define(['underscore', 'backbone', 'templateManager'], function (_, Backbone, TemplateManager) {
	'use strict';

	var BotDetails = Backbone.View.extend({
		template: 'bot-details',
		className: 'bot-details',
		events: {
			'click #delete': 'deleteClicked',
			'click #edit': 'editClicked',
			'click #start': 'startClicked',
			'click #stop': 'stopClicked',
			'click #back': 'backClicked'
		},
		initialize: function (options) {
			this.ev = options.ev;
			_.bindAll(this);
			this.model.on('change:isRunning', this.render);
			this.ev.on('bot:startComplete', this.render);
			this.ev.on('bot:stopComplete', this.render);
		},
		render: function () {
			var that = this;
			TemplateManager.get(this.template, function (tmp) {
				var html = tmp(that.model.toJSON());
				that.$el.html(html);
			});

			return this;
		},
		deleteClicked: function (e) {
			this.ev.trigger('bot:delete', this.model);
			return false;
		},
		editClicked: function (e) {
			return false;
		},
		startClicked: function (e) {
			this.ev.trigger('bot:start', this.model);
			return false;
		},
		stopClicked: function (e) {
			this.ev.trigger('bot:stop', this.model);
			return false;
		},
		backClicked: function (e) {
			this.ev.trigger('bots:show', $(e.currentTarget).attr('href'));
			return false;
		},
		onClose: function () {
			this.model.off('change:isRunning');
			this.ev.off('bot:startComplete');
			this.ev.off('bot:stopComplete');
		}
	});

	return BotDetails;
});