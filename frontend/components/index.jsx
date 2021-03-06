var React = require('react'),
    ArticleStore = require('../stores/article_store.js'),
    ApiUtil = require('../util/api_util.js'),
    Link = require('react-router').Link;

var Index = React.createClass({
  getInitialState: function() {
    var cidx = (this.props.location.query.idx ? parseInt(this.props.location.query.idx) : 1);
    return { articles: ArticleStore.all(), idx: cidx };
  },

  componentDidMount: function() {
    this.listener = ArticleStore.addListener(this._onChange);
    if (this.state.idx < 4) {
      ApiUtil.fetchArticles();
    }
    else {
      ApiUtil.fetchMoreArticles();
    }
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
              <li className="unpublished-articles">
                UNPUBLISHED ARTICLES ({showArticles.length})
              </li>
              <li className="author">
                AUTHOR
              </li>
              <Link to={{ pathname:'/sortedwords', query: { idx: this.state.idx} }}>
                <li className="words">WORDS</li>
              </Link>
              <Link to={{ pathname:'/sortedsubmitted', query: { idx: this.state.idx} }}>
                <li className="submitted">SUBMITTED</li>
              </Link>
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
