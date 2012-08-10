define(['trafficCop', 'underscore', 'handlebars'], function ($, _, Handlebars) {
	'use strict';

	var TemplateManager = {
	    templates: {},
	    get: function (id, callback) {
	        // If the template is already in the cache, just return it.
	        if (this.templates[id]) {
	            return callback(this.templates[id]);
	        }
	        // Otherwise, use Traffic Cop to load up the template.
	        var url = 'templates/' + id + '.html',
	            promise = $.trafficCop(url),
	            that = this;
	        promise.done(function (template) {
	            // Once loading is complete, compile and cache the template for later use.
	            var tmp = Handlebars.compile(template);
	            that.templates[id] = tmp;
	            callback.call(that, tmp);
	        });
	    }
	};

	return TemplateManager;
});