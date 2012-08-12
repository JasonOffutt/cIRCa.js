define(['underscore', 'backbone'], function (_, Backbone) {
	'use strict';

	var NewBot = Backbone.View.extend({
		initialize = function (options) {
			this.ev = options.ev;
		}
	});

	return NewBot;
});