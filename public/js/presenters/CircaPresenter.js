define([
		'underscore',
		'editAccountView',
		'accountDetailsView',
		'editBotView',
		'newBotView',
		'botDetailsView',
		'botListView',
		'homePageView',
		'notFoundView'
	], 
	function (_, EditAccount, AccountDetails, EditBot, NewBot, BotDetails, BotList, HomePage, NotFound) {
		'use strict';

		var CircaPresenter = function (options) {
			this.ev = options.ev;
			_.bindAll(this);
		};

		CircaPresenter.prototype.showView = function (view) {
			if (this.currentView) {
				this.currentView.close();
			}

			this.currentView = view;
			this.currentView.render().$el.appendTo('#main-content');
		};

		CircaPresenter.prototype.editAccount = function () {
			var view = new EditAccount({ ev: this.ev });
			this.showView(view);
		};

		CircaPresenter.prototype.showAccount = function () {
			var view = new AccountDetails({ ev: this.ev });
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
			var view = new BotList({ ev: this.ev });
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

		return CircaPresenter;
	});