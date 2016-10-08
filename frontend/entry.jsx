var React = require('react'),
    ReactDOM = require('react-dom'),
    Index = require('./components/index.jsx'),
    hashHistory = require('react-router').hashHistory,
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    SortedWords = require('./components/sort_Words.jsx'),
    SortSubmitted = require('./components/sort_submitted.jsx');

var routes = (
  <Router history={hashHistory}>
    <Route path="/" >
      <IndexRoute component={Index}/>
      <Route path="sortedwords" component={SortedWords} />
      <Route path="sortedsubmitted" component={SortSubmitted} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(routes, document.getElementById('root'));
});
