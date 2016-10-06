var Store = require('flux/utils').Store,
    ApiDispatcher = require('../dispatcher/dispatcher'),
    ArticleStore = new Store(ApiDispatcher),
    ArticleConstants = require('../constants/article_constants');

var _articles = [];

var resetArticles = function(articles) {
  _articles = articles;
};

ArticleStore.all = function() {
  return _articles.slice(0);
};

ArticleStore.resetArticles = function() {
  _articles = [];
};

ArticleStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case ArticleConstants.ARTICLES_RECEIVED:
      resetArticles(payload.articles);
      ArticleStore.__emitChange();
      break;
  }
};

module.exports = ArticleStore;
