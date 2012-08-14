define(['underscore', 'backbone', 'templateManager'], function (_, Backbone, TemplateManager) {
	'use strict';

	var AccountDetails = Backbone.View.extend({
		template: 'account',
		className: 'account-details',
		events: {
			'click a': 'botsClicked'
		},
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
		},
		botsClicked: function (e) {
			this.ev.trigger('bots:show', $(e.currentTarget).attr('href'));
			return false;
		}
	});

	return AccountDetails;
});