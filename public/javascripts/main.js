(function() {
	'use strict';
	var socket = io.connect();
	socket.on('connected', function (data) {
		console.log(data);
		socket.on('chat', function (chat) {
			console.log(chat);
			var $li = $('<li/>');
			$li.text(chat.message);
			$('#chat-log').append($li);
		});
	});
}());