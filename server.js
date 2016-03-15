'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb').MongoClient;

var app = express();
require('dotenv').config();
var port = process.env.PORT || 8080;
var path = process.cwd();

mongo.connect(process.env.MONGO_URI, function(err, db) {
	if (err) {
		throw new Error('DB failed to connect');
	} else {
		console.log('Mongo DB successfuly connected on port 27017');
	}

	app.use('/controllers', express.static(path + '/app/controllers'));
	app.use('/public', express.static(path + '/public'));

	routes(app, db);

	app.listen(port,  function () {
		console.log('Node.js listening on port ' + port + '...');
	});

});

module.exports = app;
