(function () {
	'use strict';

	require.config({
		paths: {
			backbone: 				'vendor/backbone/backbone-0.9.2.min',
			backboneExtensions: 	'lib/backboneExtensions',
			bootstrap: 				'vendor/bootstrap/bootsrap.min',
			bot: 					'models/Bot',
			botCollection: 			'models/BotCollection', 
			channelLog: 			'models/ChannelLog',
			channelLogCollection: 	'models/ChannelLogCollection',
			circaPresenter: 		'presenters/CircaPresenter',
			circaRouter: 			'routers/CircaRouter',
			events: 				'lib/events',
			handlebars: 			'vendor/handlebars/handlebars-1.0.0beta6',
			homePageView: 			'views/HomePage',
			jquery: 				'vendor/jquery/jquery-1.7.2.min',
			jqueryExtensions: 		'lib/jqueryExtensions',
			json: 					'vendor/json/json2',
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
					'socketClient', 
					'circaRouter'
				], 
				function ($, jqueryExtensions, _, Backbone, backboneExtensions, socketClient, CircaRouter) {
					jqueryExtensions.init();
					backboneExtensions.init();
					socketClient.init();

					var router = new CircaRouter();
					Backbone.history.start({ pushState: true });
				});
		}
	});
} ());