define(['underscore', 'backbone', 'templateManager', 'bot'], function (_, Backbone, TemplateManager, Bot) {
	'use strict';

	var NewBot = Backbone.View.extend({
		template: 'bot-new',
		className: 'new-bot',
		events: {
			'click .add': 'addChannelClicked',
			'click .del': 'delChannelClicked',
			'click #save': 'saveClicked',
			'click .cancel': 'cancelClicked'
		},
		initialize: function (options) {
			this.ev = options.ev;
			this.model = new Bot();
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
		addChannelClicked: function (e) {
			var $channels = this.$el.find('#channels'),
				$newChannel = this.$el.find('#add-channel');

			TemplateManager.get('channel-list-item', function (tmp) {
				$channels.append(tmp($newChannel.val()));
				$newChannel.val('');
			});

			return false;
		},
		delChannelClicked: function (e) {
			$(e.currentTarget).parents('li').remove();
			return false;
		},
		saveClicked: function (e) {
			var attrs = {
				name: this.$el.find('#name').val(),
				server: this.$el.find('#server').val(),
				channels: _.pluck(this.$el.find('#channels > li > strong'), 'innerText')
			};
			this.ev.trigger('bots:save', attrs);
			return false;
		},
		cancelClicked: function (e) {
			this.ev.trigger('bots:list', $(e.currentTarget).attr('href'));
			return false;
		}
	});

	return NewBot;
});