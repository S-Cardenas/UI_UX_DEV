var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
  fetchArticles: function() {
    var request = new XMLHttpRequest();
    var articles;
    request.open('GET', 'articles.json', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        // Success!
        articles = JSON.parse(request.responseText);

        ApiActions.receiveAllArticles(articles);
      }
      else {
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function() {
      console.log('there was an error and the articles werent fetched');
    };
    request.send();
  }
};

module.exports = ApiUtil;
