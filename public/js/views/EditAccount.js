define(['underscore' ,'backbone'], function (_, Backbone) {
	'use strict';

	var EditAccount = Backbone.View.extend({
		initialize: function (options) {
			this.ev = options.ev;
		}
	});

	return EditAccount;
});