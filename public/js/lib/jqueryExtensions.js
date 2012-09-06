define(['jquery', 'json'], function ($, JSON) {
	'use strict';

	return {
        init: function () {
            var csrf = $('#csrf').val();

            $.ajaxSetup({
                headers: { 'x-csrf-token': csrf }
            });

            // Traffic Cop jQuery plugin to marshall requests being sent to the server.
            // (found here: https://github.com/ifandelse/TrafficCop)
            // You can optionally modify `Backbone.sync` to use this plugin over `$.ajax`
            // or just use it for other utility functions (bootstrapping data, loading
            // external Underscore/Mustache/Handlebars templates, etc.

            // Requests are cached in here by settings value. If the cached request already
            // exists, append the callback to the cached request rather than making a second
            // one. This will prevent race conditions when loading things rapid fire from
            // the server.
            var inProgress = {};
            $.trafficCop = function(url, options) {
                var reqOptions = url, 
                    key,
                    i,
                    fn,
                    args;

                if(arguments.length === 2) {
                    reqOptions = $.extend(true, options, { url: url });
                }

                key = JSON.stringify(reqOptions);

                if (key in inProgress) {
                    for (i in {success: 1, error: 1, complete: 1}) {
                        fn = inProgress[key][i];
                        args = reqOptions[i];
                        if (typeof fn === 'function') {
                            fn(args);
                        }
                    }
                } else {
                    // Ultimately, we just wrap `$.ajax` and return the promise it generates.
                    // In the event that $.ajax does not return a promise (e.g. - Sinon spy, etc),
                    // stash a Deferred to preserve trafficCop's interface.
                    inProgress[key] = $.ajax(reqOptions) || $.Deferred();
                    inProgress[key].always(function() {
                        delete inProgress[key];
                    });
                }
                
                return inProgress[key];
            };
        }
    };
});