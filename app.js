var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mysql = require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

require('dotenv').config();

var prefix = process.env.DB_PREFIX || "DB_"
function getDBEnv(envName) {
	return process.env[prefix + envName];
}

var config = {
	db: {
		host: getDBEnv("HOST"),
		user: getDBEnv("USER"),
		password: getDBEnv("PASSWORD"),
		database: getDBEnv("DB"),
		connnectionLimit: getDBEnv("CONNECION_LIMIT") || 10,
	},
	port: process.env.HTTP_PORT || 3000,
	socketPort: process.env.SOCKET_PORT || 3100,
	googleOauth: {
		clientId: process.env.GOOGLEOAUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLEOAUTH_CLIENT_SECRET
	},
	serverName: process.env.SERVERNAME,
	session: {
		secret: process.env.SESSION_SECRET
	},
	debug: true
}

var mysqlPool = mysql.createPool(config.db);
var users = require('./SocketUser/modules/users.js')(mysqlPool, config);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




/*---------------- SETUP SESSION ----------------*/
var expressSession = require('express-session');
sessionMiddleware = expressSession({
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);


/*---------------- SETUP ROUTES ----------------*/
var authRoutes = require('./SocketUser/routes/auth')(users);

app.use('/', index);
// app.use('/users', users);
app.use('/auth', authRoutes);

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
/* START SOCKET SETUP */

var socket = require('socket.io')(server);


module.exports = app;
