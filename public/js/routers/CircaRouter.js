define(['underscore','backbone', 'circaPresenter'], function (_, Backbone, CircaPresenter) {
	'use strict';

	var CircaRouter = Backbone.Router.extend({
		routes: {
			'': 'index'
		},
		initialize: function (options) {
			this.presenter = new CircaPresenter(options);
		},
		index: function () {
			this.presenter.showHomePage();
		}
	});

	return CircaRouter;
});