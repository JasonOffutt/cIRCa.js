define(['trafficCop', 'underscore', 'handlebars'], function ($, _, Handlebars) {
	'use strict';

	var TemplateManager = {
		templates: {},
		get: function (id, callback, options) {
            //set default values
            if (_.isUndefined(options)) {
                options = {reload: false};
            }
            if (options.reload && this.templates[id]) {
                delete this.templates[id];
            }

			// If the template is already in the cache, just return it.
			if (this.templates[id]) {
				callback.call(this, this.templates[id]);
				return;
			}

			// Otherwise, use Traffic Cop to load up the template.
			var url = id + '.html',
				promise = $.trafficCop(url),
				that = this;

			promise.done(function(template) {
				// Once loading is complete, compile and cache the template for later use.
				var tmp = _.template(template);
				that.templates[id] = tmp;
				callback.call(that, tmp);
			});
		}
	};

	return TemplateManager;
});