var React = require('react'),
    ArticleStore = require('../stores/article_store.js'),
    ApiUtil = require('../util/api_util.js');

var Index = React.createClass({
  getInitialState: function() {
    return { articles: ArticleStore.all() };
  },

  componentDidMount: function() {
    this.articleListener = ArticleStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ articles: ArticleStore.all() });
  },

  render: function() {
    console.log(this.state.properties);
    return(
      <div>
        hello there
        {this.state.properties}
      </div>
    );
  }
});

module.exports = Index;
