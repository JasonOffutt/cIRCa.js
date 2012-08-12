define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	var BotDetails = Backbone.View.extend({
		initialize: function (options) {
			this.ev = options.ev;
		}
	});

	return BotDetails;
});