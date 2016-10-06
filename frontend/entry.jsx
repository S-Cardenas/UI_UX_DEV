var React = require('react'),
    ReactDOM = require('react-dom'),
    Index = require('./components/index.jsx');

// var request = new XMLHttpRequest();
// var data;
// request.open('GET', 'articles.json', true);
//
// request.onload = function() {
//   if (request.status >= 200 && request.status < 400){
//     // Success!
//     data = JSON.parse(request.responseText);
//     window.data = data;
//   }
//   else {
//     // We reached our target server, but it returned an error
//
//   }
// };
//
// request.onerror = function() {
//   // There was a connection error of some sort
// };
//
// request.send();

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
