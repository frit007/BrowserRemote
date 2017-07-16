var express = require('express');
var router = express.Router();

module.exports = function(users) {
	
	router.use(users.requireSocketLogin)
	/* GET home page. */
	router.get('/', function(req, res, next) {
		// res.render('index', { title: 'Express' });
		res.redirect('/auth');
	});

	return router;
}


