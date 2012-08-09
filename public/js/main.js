'use strict';
require.config({
	paths: {
		backbone: 	'vendor/backbone/backbone-0.9.2.min'
		bootstrap: 	'vendor/bootstrap/bootsrap.min',
		handlebars: 'vendor/handlebars/handlebars-1.0.0beta6'
		jquery: 	'vendor/jquery/jquery-1.7.2.min',
		json: 		'vendor/json/json2',
		order: 		'vendor/require/order',
		underscore: 'vendor/underscore/underscore-1.3.3.min'
	}
});

// TODO: Move into a socket client module...
(function() {
	var socket = io.connect();
	socket.on('connected', function (data) {
		//console.log(data);
		socket.on('chat', function (chat) {
			//console.log(chat);
			var $li = $('<li/>');
			$li.text(chat.message);
			$('#chat-log').append($li);
		});
	});
}());