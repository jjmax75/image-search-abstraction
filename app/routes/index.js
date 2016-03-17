'use strict';

var path = process.cwd();

var SearchHandler = require(path + '/app/controllers/searchHandler.server.js');

module.exports = function (app, db) {

	var searchHandler = new SearchHandler(db);

	app.route('/')
    .get(function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

	app.route('/api/imagesearch/:searchTerm')
		.get(searchHandler.searchImages);
};
