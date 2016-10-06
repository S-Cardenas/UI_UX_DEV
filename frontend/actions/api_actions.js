var ApiDispatcher = require('../dispatcher/dispatcher.js'),
    ArticleConstants = require('../constants/article_constants.js');

var ApiActions = {
  receiveAllArticles: function(articles) {
    ApiDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articles: articles
    });
  }
};

module.exports = ApiActions;
