define(['underscore','backbone', 'circaPresenter'], function (_, Backbone, CircaPresenter) {
	'use strict';

	var CircaRouter = Backbone.Router.extend({
		routes: {
			'account/edit': 'editAccount',
			'account': 'account',
			'bots/edit/:id': 'editBot',
			'bots/new': 'newBot',
			'bots/:id': 'getBot',
			'bots': 'botList',
			'': 'index',
			'*options': 'notFound'
		},
		initialize: function (options) {
			this.ev = options.ev;
			this.presenter = new CircaPresenter(options);
			_.bindAll(this);
			this.bindEvents();
		},
		bindEvents: function () {
			this.ev.on('bots:show', this.navigateTo);
		},
		editAccount: function () {
			this.presenter.editAccount();
		},
		account: function () {
			this.presenter.showAccount();
		},
		editBot: function (id) {
			this.presenter.editBot(id);
		},
		newBot: function () {
			this.presenter.newBot();
		},
		getBot: function (id) {
			this.presenter.showBot(id);
		},
		botList: function () {
			this.presenter.showBotList();
		},
		index: function () {
			this.presenter.showHomePage();
		},
		notFound: function () {
			this.presenter.showNotFound();
		},
		navigateTo: function (path) {
			this.navigate(path, true);
		}
	});

	return CircaRouter;
});