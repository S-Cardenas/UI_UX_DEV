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
      var myArticles = this.state.articles.map(function(article, i) {
        return(
          <div className="article-item group" key={i}>

            <div className="item-title group">
              <img className="title-image"></img>
              <div>{article.title}</div>
            </div>

            <div className="item-author">
              {article.profile.first_name} {article.profile.last_name}
            </div>

            <div className="item-words">
              {article.words}
            </div>

            <div className="item-submitted">
              {article.publish_at}
            </div>

          </div>
        );
      }.bind(this));

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

          <div className="articles-list">
            {myArticles}
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
