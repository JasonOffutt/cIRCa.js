define(['underscore', 'backbone', 'events', 'templateManager'], function (_, Backbone, events, TemplateManager) {
	'use strict';

	var HomePageView = Backbone.View.extend({
		template: 'home-page',
		className: 'home',
		initialize: function (options) {
			_.bindAll(this);
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

	return HomePageView;
});