'use strict';

var WebServer = (function () {
	var http,
		server,
		app,
		express,
		rootDir,
		routes,
		secret,
		configure = function (sessionStore) {
			app.configure(function () {
			    app.set('port', process.env.PORT || 3000);
			    app.set('views', rootDir + '/views');
			    app.set('view engine', 'jade');
			    app.use(express.favicon());
			    app.use(express.logger('dev'));
			    app.use(express.bodyParser());
			    app.use(express.cookieParser());
			    app.use(express.session({
			        secret: secret,
			        store: sessionStore
			    }));
			    app.use(express.csrf());
			    app.use(express.methodOverride());
			    app.use(app.router);
			    app.use(express.static(rootDir + '/public'));
			});
		},

		registerRoutes = function () {
			app.get('/', routes.index);
		};

		return {
			init: function (options) {
				http = options.http;
				express = options.express;

				app = express();
				server = http.createServer(app);
				routes = require('../routes');
				return server;
			},

			configure: function (root, sessionStore, salt) {
				rootDir = root;
				secret = salt;
				configure(sessionStore);
				registerRoutes();
				return this;
			},

			start: function () {
				var port = app.get('port');
				server.listen(port, function () {
					console.log('Express server listening on port ' + port);
				});
			}
		};
} ());

module.exports = WebServer;