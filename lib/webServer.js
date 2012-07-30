'use strict';

var WebServer = (function () {
	var http = require('http'),
		deps = {},
		app,
		rootDir,
		routes,
		configure = function (sessionStore) {
			app.configure(function () {
			    app.set('port', process.env.PORT || 3000);
			    app.set('views', rootDir + '/views');
			    app.set('view engine', 'jade');
			    app.use(deps.express.favicon());
			    app.use(deps.express.logger('dev'));
			    app.use(deps.express.bodyParser());
			    app.use(deps.express.cookieParser());
			     app.use(deps.express.session({
			         secret: 'keyboardcat',
			         store: sessionStore
			     }));
			    app.use(deps.connect.csrf());
			    app.use(deps.express.methodOverride());
			    app.use(app.router);
			    app.use(deps.express.(staticrootDir + '/public'));
			});

			app.configure('development', function () {
			    app.use(deps.express.errorHandler());
			});
		},
		
		registerRoutes = function () {
			app.get('/', routes.index);
		},

		start = function () {
			http.createServer(app).listen(app.get('port'), function () {
			    console.log("Express server listening on port " + app.get('port'));
			});
		};

	return {
		init: function (connect, express, root) {
			deps.connect = connect;
			deps.express = express;
			rootDir = root;
			app = deps.express();
			routes = require('../routes');
			return this;
		},
		configure: function (sessionStore) {
			configure(sessionStore);
			registerRoutes();
			return this;
		},
		start: function () {
			start();
		},
		getApp: function () {
			return app;
		}
	}
} ());

module.exports = WebServer;