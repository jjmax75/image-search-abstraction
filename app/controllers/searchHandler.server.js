'use strict';

var path = process.cwd();
var imageSearch = require('node-google-image-search');

function SearchHandler(db) {

  // TODO setup db
  var searchesDb = db.collection('searches');

  this.searchImages = function(req, res) {
    // TODO spaces not allowed in URI yet
    var searchTerm = req.params.searchTerm;
    // TODO offset param :offset

    imageSearch(searchTerm, displayResults);

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
}

module.exports = SearchHandler;
