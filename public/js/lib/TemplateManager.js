define(['jquery' ,'underscore', 'handlebars'], function ($, _, Handlebars) {
	'use strict';

	var TemplateManager = {
		partials: [
			{ name: 'botForm', template: 'bot-form' },
			{ name: 'channelListItem', template: 'channel-list-item' }
		],
	    templates: {},
	    get: function (id, callback) {
	        // If the template is already in the cache, just return it.
	        if (this.templates[id]) {
	            return callback(this.templates[id]);
	        }
	        // Otherwise, use Traffic Cop to load up the template.
	        var url = '/templates/' + id + '.html',
	            promise = $.trafficCop(url),
	            that = this;
	        promise.done(function (template) {
	            // Once loading is complete, compile and cache the template for later use.
	            var tmp = Handlebars.compile(template);
	            that.templates[id] = tmp;
	            callback.call(that, tmp);
	        });
	    },
	    registerPartials: function (callback) {
	    	var that = this;

	    	_.each(this.partials, function (partial, index) {
	    		that.get(partial.template, function (tmp) {
	    			Handlebars.registerPartial(partial.name, tmp);

	    			if (index + 1 === that.partials.length) {
	    				callback();
	    			}
	    		});
	    	});
	    }
	};

	return TemplateManager;
});