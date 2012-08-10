(function () {
	'use strict';

	require.config({
		paths: {
			backbone: 				'vendor/backbone/backbone.require',
			bootstrap: 				'vendor/bootstrap/bootsrap.min',
			bot: 					'models/Bot',
			botCollection: 			'models/BotCollection', 
			channelLog: 			'models/ChannelLog',
			channelLogCollection: 	'models/ChannelLogCollection'
			handlebars: 			'vendor/handlebars/handlebars.require',
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
			require(['order!jquery', 'order!underscore', 'order!backbone', 'socketClient'], function ($, _, Backbone, socketClient) {
				socketClient.init();
			});
		}
	});
} ());