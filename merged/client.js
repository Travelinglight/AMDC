var net = require('net');
var decoder = require('./decode.js');
var http = require("http");
//var bodyParser = require("body-parser");

var send=1;
var login = "user bg5zzz pass 24229 "
var postData = '';

var pullOptions = {
  host: 'rotate.aprs2.net',
  port: 14580,
}

var client = net.connect(pullOptions,function(){
  console.log('Client connected.');
  client.write(login);
  client.write('# filter t/p\r\n');
}).on('error',function(error){
  console.log('Error: '+error.message);
})

client.on('data',function(data){
  var i=0;
  var rec = data.toString();
  var j=0;
  var buff = '';
  for (i = 0; i < rec.length; ++i) {
    buff += rec[i];
    if (rec[i] == '\n') {
      filter(buff);
      buff = '';
    }
  }
})

function filter(d_msg){
  var i=0;
  while(d_msg[i]!=':' && i<d_msg.length)
    ++i;
  if((d_msg[i+1]=='`' || d_msg[i+1]=="'") && (d_msg.search(">") >= 0) && (send == 1)) {
    console.log(d_msg);
    var haha = decoder.decode(d_msg);
    postData = JSON.stringify(haha);
    //console.log(postData);
    if (postData != undefined) {
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
      var req = http.request(postOptions, function(res) {
        console.log("yes, iykon is handsome.")
      });
      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });
      req.write(postData);
      req.end();
    }
  }
}

client.on('end',function(){
  console.log('Client unconnected.');
})

//req.end();
