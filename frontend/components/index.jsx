var React = require('react'),
    ArticleStore = require('../stores/article_store.js'),
    ApiUtil = require('../util/api_util.js');

var Index = React.createClass({
  getInitialState: function() {
    return { articles: ArticleStore.all(), idx: 1, sorted: false,
            submittedSort: false };
  },

  componentDidMount: function() {
    this.articleListener = ArticleStore.addListener(this._onChange);
    ApiUtil.fetchArticles();
  },

  _onChange: function() {
    this.setState({ articles: ArticleStore.all() });
  },

  _increaseIdx: function() {
    var nextIdx = this.state.idx + 1;
    if (nextIdx === 4) {
      ApiUtil.fetchMoreArticles();
      this.setState({ idx: nextIdx });
    }
    else {
      this.setState({ idx: nextIdx});
    }
  },

  _sortWords: function() {
    var sortedArticles = this.state.articles.slice(0);

    sortedArticles = sortedArticles.sort(function(a, b) {
      if (a.words > b.words) {
         return 1;
      }
      if (a.words < b.words) {
         return -1;
      }
      return 0;
    });

    return sortedArticles;
  },

  _sortSubmitted: function() {
    var sortedArticles = this.state.articles.slice(0);

    sortedArticles = sortedArticles.sort(function(a, b) {
      var aDate = new Date(a.publish_at),
          bDate = new Date(b.publish_at);

      if (aDate.getTime() > bDate.getTime()) {
         return 1;
      }
      if (aDate.getTime() < bDate.getTime()) {
         return -1;
      }
      return 0;
    });

    return sortedArticles;
  },

  _setSortState: function() {
    var truthiness = !this.state.sorted;
    this.setState({ sorted: truthiness });
  },

  _setSubmittedSortState: function() {
    var truthiness = !this.state.submittedSort;
    this.setState({ submittedSort: truthiness });
  },

  render: function() {
    if (this.state.articles.length > 0) {
      var myArticles;
      if (this.state.sorted) {
        myArticles = this._sortWords();
      }
      else if (this.state.submittedSort) {
        myArticles = this._sortSubmitted();
      }
      else {
        myArticles = this.state.articles;
      }
        myArticles = myArticles.map(function(article, i) {
        var currentTime = new Date(),
            publishedTime = new Date(article.publish_at),
            elapsedSec = Math.floor((currentTime - publishedTime)/1000),
            elapsedMin = Math.floor(elapsedSec / 60),
            elapsedHours = Math.floor(elapsedMin / 60),
            elapsedDays = Math.floor(elapsedHours / 24);

        return(
          <div className="article-item group" key={i}>

            <div className="item-title group">
              <img className="title-image" src={article.image}></img>
              <a href={article.url}>{article.title}</a>
            </div>

            <div className="item-author">
              {article.profile.first_name} {article.profile.last_name}
            </div>

            <div className="item-words">
              {article.words}
            </div>

            <div className="item-submitted">
              {elapsedDays} days ago
            </div>

          </div>
        );
      }.bind(this));

      var showArticles = myArticles.slice(0, (this.state.idx * 10) - 1);

      return(
        <div className="content">

          <div className="header group">
            <ul>
              <li className="unpublished-articles">UNPUBLISHED ARTICLES</li>
              <li className="author">AUTHOR</li>
              <li className="words" onClick={this._setSortState}>WORDS</li>
              <li className="submitted" onClick={this._setSubmittedSortState}>SUBMITTED</li>
            </ul>
          </div>

          <div className="articles-list">
            {showArticles}
          </div>

          <button className="load-more" onClick={this._increaseIdx}>Load More</button>

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
