(function() {
	'use strict';
	var socket = io.connect();
	socket.on('message:received', function (data) {
		var $li = $('<li/>');
		$li.text(data);
		$('#chat-log').append($li);
	});
}());