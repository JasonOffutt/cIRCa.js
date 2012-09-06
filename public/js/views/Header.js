define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	var Header = Backbone.View.extend({
		el: '#userlogin',
		template: 'user-login',
		events: {
			'click .account': 'accountClicked'
		},
		initialize: function (options) {
			this.ev = options.ev;
			this.model = options.model;
			_.bindAll(this);
			//this.model.on('change', this.render);
		},
		render: function () {
			// TODO: Does anything more need to be done here?

			return this;
		},
		accountClicked: function (e) {
			this.ev.trigger('user:show', $(e.currentTarget).attr('href'));
			return false;
		}
	});

	return Header;
});