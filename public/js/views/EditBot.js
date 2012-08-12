define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	var EditBot = Backbone.View.extend({
		initialize: function (options) {
			this.ev = options.ev;
		}
	});

	return EditBot;
});