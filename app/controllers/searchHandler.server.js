'use strict';

var path = process.cwd();
var imageSearch = require('node-google-image-search');

function SearchHandler(db) {

  var searchesDb = db.collection('searches');

  this.searchImages = function(req, res) {

    var searchTerm = req.params.searchTerm;
    var offset = req.query.offset || 0;

    // Add search term and time to DB
    var newSearch = {
      "term": searchTerm,
      "when": new Date().toISOString()
    };

    searchesDb.insertOne(newSearch, function(err, result) {
      if (err) console.error(err);
    });

    // use node-google-image-search to perform search
    imageSearch(searchTerm, displayResults, offset);

    function displayResults(results) {
      var filteredResults = results.map(function(result) {
        return {
          "url": result.link,
          "snippet": result.snippet,
          "thumbnail": result.image.thumbnailLink,
          "context": result.image.contextLink
        };
      });

      res.json(filteredResults);
    }
  };

  this.latestSearches = function(req, res) {
    var results = [];
    searchesDb.find(
      {},
      {_id: false},
      function (err, response) {
        if (err) console.error(err);

        response.on('data', function(item) {
          results.push(item);
        });

        response.on('end', function() {
          res.json(results);
        });
      }
    );
  };
}

module.exports = SearchHandler;
