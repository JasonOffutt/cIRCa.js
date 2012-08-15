define(['underscore', 'backbone', 'templateManager'], function (_, Backbone, TemplateManager) {
	'use strict';

	var AccountDetails = Backbone.View.extend({
		template: 'account',
		className: 'account-details',
		events: {
			'click .bot-list': 'botsClicked',
			'click .user-edit': 'editClicked'
		},
		initialize: function (options) {
			this.ev = options.ev;
			this.model = options.model;
			_.bindAll(this);
			this.model.on('change', this.render);
		},
		render: function () {
			var that = this;
			TemplateManager.get(this.template, function (tmp) {
				var html = tmp(that.model.toJSON());
				that.$el.html(html);
			});

			return this;
		},
		botsClicked: function (e) {
			this.ev.trigger('bots:show', $(e.currentTarget).attr('href'));
			return false;
		},
		editClicked: function (e) {
			this.ev.trigger('user:edit', $(e.currentTarget).attr('href'));
			return false;
		},
		onClose: function () {
			this.model.off('change');
		}
	});

	return AccountDetails;
});