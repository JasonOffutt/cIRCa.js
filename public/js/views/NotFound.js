define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	var NotFound = Backbone.View.extend({
		initialize: function (options) {
			this.ev = options.ev;
		}
	});

	return NotFound;
});