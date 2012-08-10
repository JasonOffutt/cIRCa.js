(function () {
	'use strict';

	require.config({
		paths: {
			backbone: 				'vendor/backbone/backbone.require',
			backboneExtensions: 	'lib/backboneExtensions',
			bootstrap: 				'vendor/bootstrap/bootsrap.min',
			bot: 					'models/Bot',
			botCollection: 			'models/BotCollection', 
			channelLog: 			'models/ChannelLog',
			channelLogCollection: 	'models/ChannelLogCollection',
			circaPresenter: 		'presenters/CircaPresenter',
			circaRouter: 			'routers/CircaRouter',
			events: 				'lib/events',
			handlebars: 			'vendor/handlebars/handlebars.require',
			homePageView: 			'views/HomePage',
			jquery: 				'vendor/jquery/jquery-1.7.2.min',
			json: 					'vendor/json/json.require',
			order: 					'vendor/require/order',
			socketClient: 			'lib/socketClient',
			templateManager: 		'lib/TemplateManager',
			trafficCop: 			'lib/TrafficCop',
			underscore: 			'vendor/underscore/underscore.require',
			user: 					'models/User'
		},
		callback: function () {
			require(
				[
					'order!jquery', 
					'order!underscore', 
					'order!backbone', 
					'order!backboneExtensions', 
					'socketClient', 
					'circaRouter'
				], 
				function ($, _, Backbone, extensions, socketClient, CircaRouter) {
					socketClient.init();

					var router = new CircaRouter();
					Backbone.history.start({ pushState: true });
			});
		}
	});
} ());