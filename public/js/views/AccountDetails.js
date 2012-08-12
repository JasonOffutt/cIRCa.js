define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	var AccountDetails = Backbone.View.extend({
		initialize: function (options) {
			this.ev = options.ev;
		}
	});

	return AccountDetails;
});