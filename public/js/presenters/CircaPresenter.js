define(['events', 'homePageView'], function (events, HomePage) {
	'use strict';

	var CircaPresenter = function (options) {

	};

	CircaPresenter.prototype.showView = function (view) {
		if (this.currentView) {
			this.currentView.close();
		}

		this.currentView = view;
		this.currentView.render().$el.appendTo('#main-content');
	};

	CircaPresenter.prototype.showHomePage = function () {
		var view = new HomePage();
		this.showView(view);
	};

	return CircaPresenter;
});