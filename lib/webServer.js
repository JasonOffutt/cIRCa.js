'use strict';

var WebServer = (function () {
	var http,
		server,
		app,
		express,
		rootDir,
		routes,
		secret,
		everyauth = require('everyauth'),
		authService = require('./authService'),
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

			    // Dirty hack to get EveryAuth and Express 3 to play together nicely
			    app.use(authService.preEveryAuth())
			    app.use(everyauth.middleware());
			    app.use(authService.postEveryAuth());
			    // End Dirty hack

			    app.use(express.csrf());
			    app.use(express.methodOverride());
			    app.use(app.router);
			    app.use(express.static(rootDir + '/public'));
			});
		},

		registerRoutes = function () {
			app.put('/api/v1/users/:id', routes.api.users.update);
			app.get('/account/edit', routes.web.index);
			app.get('/account', routes.web.index);
			app.get('/bots/edit/:id', routes.web.index);
			app.get('/bots/new', routes.web.index);
			app.get('/bots/:id', routes.web.index);
			app.get('/bots', routes.web.index);
			app.get('/', routes.web.index);
			//app.all('/*', routes.index);
		};

		// Wire up EveryAuth handlers here, prior to any configuration being called externally
		authService.initProviders();

		return {
			init: function (options) {
				http = options.http;
				express = options.express;

				app = express();
				server = http.createServer(app);
				routes = {
					api: require('../routes/api'),
					web: require('../routes/index')
				};
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