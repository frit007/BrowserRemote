var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mysql = require('mysql');
var fs = require('fs');

var users = require('./routes/users');

var app = express();

var config = require('./modules/config');




/*---------------- SETUP SESSION ----------------*/
var expressSession = require('express-session');
sessionMiddleware = expressSession({
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false
});


var mysqlPool = mysql.createPool(config.db);
var users = require('./SocketUser/modules/socket-users.js')(mysqlPool, sessionMiddleware, config);
var RemoteManager = require('./modules/remote.js')(mysqlPool, users);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');






// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(sessionMiddleware);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*---------------- SETUP ROUTES ----------------*/
var authRoutes = require('./SocketUser/routes/auth')(users);
var indexRoutes = require('./routes/index')(users);
var remoteRoutes = require('./routes/remote')(users);

app.use('/', indexRoutes);
// app.use('/users', users);
app.use('/auth', authRoutes);
app.use('/remote', remoteRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
	// named pipe
	return val;
	}

	if (port >= 0) {
	// port number
	return port;
	}

	return false;
}

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var http = require('http');

var server = http.createServer(app);

/*END OF HTTP SETUP */

/* START HTTPS */

if (config.https.enabled) {
	var privateKey = fs.readFileSync( config.https.keyPath );
	var certificate = fs.readFileSync( config.https.certPath );

	https = require('https');
	
	https.createServer({
		key: privateKey,
		certificate 
	}, app).listen(config.https.port, function() {
		console.log("https listening on port:", config.https.port);
	})
}

/* START SOCKET SETUP */

var socket = require('socket.io')(server);


// socket.on('connection', function(client) {
// 	console.log(client);
// })
// var ns = socket.on('socket.io');
// ns.on('connection', function(c) {
// 	console.log(c);
// })
require("./sockets/remote")(users, socket);


module.exports = server;
