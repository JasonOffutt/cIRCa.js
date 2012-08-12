define(['backbone'], function (Backbone) {
	'use strict';

	var Bot = Backbone.Model.extend({
		urlRoot: '/bots',
		validate: function (attrs) {
			this.validationErrors = [];
			if (attrs.name && attrs.name === '') {
				this.validationErrors.push('Name is required');
			}

			if (attrs.server && attrs.server === '') {
				this.validationErrors.push('Server is required');
			}

			if (attrs.channels && attrs.channels.length === 0) {
				this.validationErrors.push('Please enter at least one channel');
			}

			if (this.validationErrors.length > 0) {
				return this.validationErrors;
			}
		}
	});

	return Bot;
});