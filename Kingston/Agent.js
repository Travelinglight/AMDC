var http = require("http");
var bodyParser = require("body-parser");

var postData = {};
postData.msg = "iykon is a good guy";
postData = JSON.stringify(postData);

var postOptions = {
  hostname : 'localhost',
  port : 2333,
  path : '/haha',
  method : 'POST',
  headers : {
    //'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
}

var req = http.request(options, function(res) {
  console.log("yes, iykon is handsome.")
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.write(postData);
req.end();
