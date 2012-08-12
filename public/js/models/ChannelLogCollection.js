define(['backbone', 'channelLog'], function (Backbone, ChannelLog) {
	'use strict';

	var ChannelLogCollection = Backbone.Collection.extend({
		model: ChannelLog
	});

	return ChannelLogCollection;
});