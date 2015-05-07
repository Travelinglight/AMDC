var net = require('net');
var decoder = require('./decode.js');
var http = require("http");
var fs = require("fs");

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
  client.write('# filter t/po\r\n');
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

function file_write(content, file) {
  fs.open(file,'a',function open(err,fd){
    if(err){throw err;}
    var myDate = new Date();
    var writeBuffer=new Buffer('['+myDate.toUTCString()+']'+content);
    var bufferPosition=0;
    var bufferLength=writeBuffer.length;
    var fileposition=null;
    fs.write(fd,
      writeBuffer,
      bufferPosition,
      bufferLength,
      fileposition,
      function wrote(err,written){
        if(err) {throw err;}
        console.log('wrote'+written+'byte');
        fs.closeSync(fd);
      });
  });
}

function filter(d_msg){
  file_write(d_msg, './all_data.txt');
  var i=0;
  while(d_msg[i]!=':' && i<d_msg.length)
    ++i;
  if((d_msg[i+1]=='`' || d_msg[i+1]=="'") && (d_msg.search(">") >= 0) && (send == 1)) {
    file_write(d_msg, './filter_data.txt');
    console.log(d_msg);
    var haha = decoder.decode(d_msg);
    postData = JSON.stringify(haha);
    if (postData != undefined) {
      var postOptions = {
        hostname : 'localhost',
        port : 2333,
        path : '/haha',
        method : 'POST',
        headers : {
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
  else{
    file_write(d_msg, './delete_data.txt');
  }
}

client.on('end',function(){
  console.log('Client unconnected.');
})
