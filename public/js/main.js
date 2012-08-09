(function () {
	'use strict';
	require.config({
		paths: {
			backbone: 		'vendor/backbone/backbone.require'
			bootstrap: 		'vendor/bootstrap/bootsrap.min',
			handlebars: 	'vendor/handlebars/handlebars.require'
			jquery: 		'vendor/jquery/jquery-1.7.2.min',
			json: 			'vendor/json/json.require',
			order: 			'vendor/require/order',
			socketClient: 	'lib/socketClient',
			underscore: 	'vendor/underscore/underscore.require'
		},
		callback: function () {
			require(['socketClient'], function (socketClient) {
				socketClient.init();
			});
		}
	});
} ());