define(['backbone'], function (Backbone) {
	'use strict';

	var User = Backbone.Model.extend({
		idAttribute: '_id',
		urlRoot: '/api/v1/users'
	});

	return User;
});