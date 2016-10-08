var React = require('react'),
    ArticleStore = require('../stores/article_store.js'),
    ApiUtil = require('../util/api_util.js'),
    Link = require('react-router').Link;

var SortWords = React.createClass({
  getInitialState: function() {
    return { articles: ArticleStore.all(), idx: this.props.location.query.idx, sorted: true,
            submittedSort: false };
  },

  componentDidMount: function() {
    this.listener = ArticleStore.addListener(this._onChange);
    ApiUtil.fetchArticles();
  },

  componentWillUnmount: function() {
    this.listener.remove();
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
    this.setState({ sorted: truthiness, submittedSort: false });
  },

  _setSubmittedSortState: function() {
    var truthiness = !this.state.submittedSort;
    this.setState({ submittedSort: truthiness, sorted: false });
  },

  render: function() {
    console.log(this.props.location.query.idx);
    console.log('sortedWords');
    if (this.state.articles.length > 0) {
      var myArticles  = this._sortWords();
      myArticles = myArticles.map(function(article, i) {
      var currentTime = new Date(),
          publishedTime = new Date(article.publish_at),
          elapsedSec = Math.floor((currentTime - publishedTime)/1000),
          elapsedMin = Math.floor(elapsedSec / 60),
          elapsedHours = Math.floor(elapsedMin / 60),
          elapsedDays = Math.floor(elapsedHours / 24),
          parity = ( (i % 2 === 0) ? 'odd' : 'even'),
          classTitle = "article-item " + parity + " group";

        return(
          <div className={classTitle} key={i}>

            <div className="item-title group">
              <img className="title-image" src={article.image}></img>
              <a href={article.url}>{article.title}</a>
            </div>

            <div className="item-author">
              <p>
                {article.profile.first_name} {article.profile.last_name}
              </p>
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

      var showArticles = myArticles.slice(0, (this.state.idx * 10));

      return(
        <div className="content">

          <div className="header group">
            <ul>
              <li className="unpublished-articles">UNPUBLISHED ARTICLES ({showArticles.length})</li>
              <li className="author">AUTHOR</li>
                <li className="words">
                  <Link to={{ pathname:'/', query: { idx: this.state.idx} }}>WORDS</Link>
                </li>
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

module.exports = SortWords;
