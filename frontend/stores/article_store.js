var Store = require('flux/utils').Store,
    ApiDispatcher = require('../dispatcher/dispatcher'),
    ArticleStore = new Store(ApiDispatcher),
    ArticleConstants = require('../constants/article_constants');

var _articles = [];

var resetArticles = function(articles) {
  _articles = articles;
};

var appendArticles = function(newArticles) {
  _articles = _articles.concat(newArticles);
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
    case ArticleConstants.APPEND_ARTICLES:
      appendArticles(payload.articles);
      ArticleStore.__emitChange();
      break;
  }
};

module.exports = ArticleStore;
