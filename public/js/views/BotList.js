define(['underscore', 'backbone', 'templateManager'], function (_, Backbone, TemplateManager) {
	'use strict';

	var BotList = Backbone.View.extend({
		template: 'bot-list',
		className: 'bot-list',
		initialize: function (options) {
			this.ev = options.ev;
		},
		render: function () {
			var that = this;
			TemplateManager.get(this.template, function (tmp) {
				var html = tmp();
				that.$el.html(html);
			});

			return this;
		}
	});

	return BotList;
});