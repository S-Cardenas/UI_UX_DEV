var React = require('react'),
    ArticleStore = require('../stores/article_store.js'),
    ApiUtil = require('../util/api_util.js');

var Index = React.createClass({
  getInitialState: function() {
    return { articles: ArticleStore.all() };
  },

  componentDidMount: function() {
    this.articleListener = ArticleStore.addListener(this._onChange);

    ApiUtil.fetchArticles();
  },

  _onChange: function() {
    this.setState({ articles: ArticleStore.all() });
  },

  render: function() {
    console.log(this.state.articles);
    if (this.state.articles.length > 0) {
      return(
        <div className="content">
          <div className="header group">
            <ul>
              <li className="unpublished-articles">UNPUBLISHED ARTICLES</li>
              <li className="author">AUTHOR</li>
              <li className="words">WORDS</li>
              <li className="submitted">SUBMITTED</li>
            </ul>
          </div>
          <div>
            <li>hello there</li>
            <li>{this.state.articles[0].id}</li>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>Loading</div>
      );
    }
  }
});

module.exports = Index;
