define(['jquery', 'events'], function ($, events) {
	'use strict';

	return {
		init: function () {
			var socket = io.connect();
			socket.on('connected', function (data) {
				if (data.user) {
					events.trigger('user:loaded', data.user);
				}

				socket.on('chat', function (chat) {
					//console.log(chat);
					var $li = $('<li/>');
					$li.text(chat.message);
					$('#chat-log').append($li);
				});
			});
		}
	}
});