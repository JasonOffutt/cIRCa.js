define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	var BotList = Backbone.View.extend({
		initialize: function (options) {
			this.ev = options.ev;
		}
	});

	return BotList;
});