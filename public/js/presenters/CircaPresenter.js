define([
		'underscore',
		'editAccountView',
		'accountDetailsView',
		'editBotView',
		'newBotView',
		'botDetailsView',
		'botListView',
		'homePageView',
		'notFoundView',
		'headerView',
		'user'
	], 
	function (_, EditAccount, AccountDetails, EditBot, NewBot, BotDetails, BotList, HomePage, NotFound, Header, User) {
		'use strict';

		var CircaPresenter = function (options) {
			this.ev = options.ev;
			this.user = new User();
			_.bindAll(this);
			this.renderParts();
			this.bindEvents();
		};

		CircaPresenter.prototype.renderParts = function () {
			this.header = new Header({ ev: this.ev });
			this.header.render();
		};

		CircaPresenter.prototype.bindEvents = function () {
			var that = this;
			this.ev.on('user:loaded', function (userData) {
				that.user.set(userData);
			});
			this.ev.on('user:save', this.updateUser);
		};

		CircaPresenter.prototype.showView = function (view) {
			if (this.currentView) {
				this.currentView.close();
			}

			this.currentView = view;
			this.currentView.render().$el.appendTo('#main-content');
		};

		CircaPresenter.prototype.editAccount = function () {
			var view = new EditAccount({ ev: this.ev, model: this.user });
			this.showView(view);
		};

		CircaPresenter.prototype.showAccount = function () {
			var view = new AccountDetails({ ev: this.ev, model: this.user });
			this.showView(view);
		};

		CircaPresenter.prototype.editBot = function (id) {
			var view = new EditBot({ ev: this.ev });
			this.showView(view);
		};

		CircaPresenter.prototype.newBot = function () {
			var view = new NewBot({ ev: this.ev });
			this.showView(view);
		};

		CircaPresenter.prototype.showBot = function (id) {
			var view = new BotDetails({ ev: this.ev });
			this.showView(view);
		};

		CircaPresenter.prototype.showBotList = function () {
			var view = new BotList({ ev: this.ev, model: this.user });
			this.showView(view);
		};

		CircaPresenter.prototype.showHomePage = function () {
			var view = new HomePage({ ev: this.ev });
			this.showView(view);
		};

		CircaPresenter.prototype.showNotFound = function () {
			var view = new NotFound({ ev: this.ev });
			this.showView(view);
		};

		CircaPresenter.prototype.updateUser = function (attrs) {
			var promise,
				that = this;
			this.user.set(attrs);
			promise = this.user.save();
			promise.done(function (data) {
				that.ev.trigger('user:updated', '/account');
			});
		};

		return CircaPresenter;
	});