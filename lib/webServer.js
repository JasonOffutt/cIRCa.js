'use strict';

var WebServer = (function () {
	require('./authService').initProviders();

	function preEveryauthMiddlewareHack () {
		return function (req, res, next) {
			var sess = req.session
				, auth = sess.auth
				, ea = { loggedIn: !!(auth && auth.loggedIn) };

			// Copy the session.auth properties over
			for (var k in auth) {
				ea[k] = auth[k];
			}

			if (everyauth.enabled.password) {
				// Add in access to loginFormFieldName() + passwordFormFieldName()
				ea.password || (ea.password = {});
				ea.password.loginFormFieldName = everyauth.password.loginFormFieldName();
				ea.password.passwordFormFieldName = everyauth.password.passwordFormFieldName();
			}

			res.locals.everyauth = ea;

			next();
	    }
	};

	function postEveryauthMiddlewareHack () {
		var userAlias = everyauth.expressHelperUserAlias || 'user';
		return function(req, res, next) {
			res.locals.everyauth.user = req.user;
			res.locals[userAlias] = req.user;
			next();
		};
	};

	var http,
		server,
		app,
		express,
		rootDir,
		routes,
		secret,

		// Note: the version of `everyauth` used here is a special development branch to add support
		// for Express 3. Run `npm install everyauth@git://github.com/bnoguchi/everyauth.git#express3`
		// to get it to work. For more details: https://github.com/bnoguchi/everyauth/issues/243
		everyauth = require('everyauth'),
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
			    app.use(preEveryauthMiddlewareHack())
			    app.use(everyauth.middleware());
			    app.use(postEveryauthMiddlewareHack());
			    app.use(express.csrf());
			    app.use(express.methodOverride());
			    app.use(app.router);
			    app.use(express.static(rootDir + '/public'));
			});
		},

		registerRoutes = function () {
			app.get('/bots', routes.bots.index);
			app.get('/', routes.home.index);
		};

		return {
			init: function (options) {
				http = options.http;
				express = options.express;

				app = express();
				server = http.createServer(app);
				routes = {
					home: require('../routes/index'),
					bots: require('../routes/bots')
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