var React = require('react'),
    ReactDOM = require('react-dom');

// $.getJSON("articles.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

var request = new XMLHttpRequest();
var data;
request.open('GET', 'articles.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    // Success!
    data = JSON.parse(request.responseText);
    console.log(data);
    console.log('fuck you');
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

// var txt = '';
// var request = new XMLHttpRequest();
// request.onreadystatechange = function(){
//   if(request.status == 200 && request.readyState == 4){
//     txt = request.responseText;
//   }
// };
//
// request.open('GET', chrome.extension.getURL('/articles.json'), true);
// request.send();
//
// request.open('GET', './articles.json', true);
//
// request.onload = function(e) {
//   console.log(request.status);
//   if (request.status >= 200 && request.status < 400){
//     // Success!
//     console.log('here');
//     console.log(request.responseText);
//     data = JSON.parse(request.responseText);
//     console.log(data);
//   }
//   else {
//     // We reached our target server, but it returned an error
//     console.log('it didnt work');
//   }
// };
//
// request.onerror = function() {
//   console.log('there was an error');
// };

// $.ajax({
//   type: 'GET',
//   url: '/articles.json',
//   success: function(resp) {
//     console.log(resp);
//   },
//   error: function() {
//     console.log("Didn't find the properties.");
//   }
// });

// $.getJSON('/articles.json', function(data) {
//   console.log(data);
// });

// console.log(request);

// console.log(data);

// var MyComponent = React.createClass({
//   render: function() {
//     return(
//       <div>Hello World</div>
//     );
//   }
// });
//
// document.addEventListener("DOMContentLoaded", function() {
//   ReactDOM.render(<MyComponent />, document.getElementById('root'));
// });
