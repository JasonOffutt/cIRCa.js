define(['underscore' ,'backbone', 'templateManager'], function (_, Backbone, TemplateManager) {
	'use strict';

	var EditAccount = Backbone.View.extend({
		template: 'account-edit',
		className: 'edit-account',
		events: {
			'click #save': 'saveClicked',
			'click .cancel': 'cancelClicked'
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
		saveClicked: function (e) {
			var data = {
				name: this.$el.find('#name').val(),
				email: this.$el.find('#email').val()
			};
			this.ev.trigger('user:save', data);
			return false;
		},
		cancelClicked: function (e) {
			this.ev.trigger('user:show', $(e.currentTarget).attr('href'));
			return false;
		},
		onClose: function () {
			this.model.off('change');
		}
	});

	return EditAccount;
});