(function () {
	'use strict';

	require.config({
		paths: {
			accountDetailsView: 	'views/AccountDetails',
			backbone: 				'vendor/backbone/backbone-0.9.2.min',
			backboneExtensions: 	'lib/backboneExtensions',
			bootstrap: 				'vendor/bootstrap/bootsrap.min',
			bot: 					'models/Bot',
			botCollection: 			'models/BotCollection', 
			botDetailsView: 		'views/BotDetails',
			botListView: 			'views/BotList',
			channelLog: 			'models/ChannelLog',
			channelLogCollection: 	'models/ChannelLogCollection',
			circaPresenter: 		'presenters/CircaPresenter',
			circaRouter: 			'routers/CircaRouter',
			editAccountView: 		'views/EditAccount',
			editBotView: 			'views/EditBot',
			events: 				'lib/events',
			handlebars: 			'vendor/handlebars/handlebars-1.0.0beta6',
			headerView: 			'views/Header',
			homePageView: 			'views/HomePage',
			jquery: 				'vendor/jquery/jquery-1.7.2.min',
			jqueryExtensions: 		'lib/jqueryExtensions',
			json: 					'vendor/json/json2',
			newBotView: 			'views/NewBot',
			notFoundView: 			'views/NotFound',
			socketClient: 			'lib/socketClient',
			templateManager: 		'lib/TemplateManager',
			underscore: 			'vendor/underscore/underscore-1.3.3.min',
			user: 					'models/User'
		},
		shim: {
			'underscore': {
				deps: [],
				exports: '_'
			},
			'jquery': {
				deps: [],
				exports: '$'
			},
			'backbone': {
				deps: [ 'underscore', 'jquery' ],
				exports: 'Backbone'
			},
			'json': {
				deps: [],
				exports: 'JSON'
			},
			'handlebars': {
				deps: [],
				exports: 'Handlebars'
			}
		},
		callback: function () {
			require(
				[
					'jquery',
					'jqueryExtensions',
					'underscore', 
					'backbone', 
					'backboneExtensions', 
					'events',
					'socketClient', 
					'circaRouter'
				], 
				function ($, jqueryExtensions, _, Backbone, backboneExtensions, events, socketClient, CircaRouter) {
					jqueryExtensions.init();
					backboneExtensions.init();
					socketClient.init();

					var router = new CircaRouter({ ev: events });
					Backbone.history.start({ pushState: true });
				});
		}
	});
} ());