var net = require('net');
var decoder = require('./decode.js');
var http = require("http");
var fs = require("fs");
//var bodyParser = require("body-parser");

var send=1;
var login = "user bg5zzz pass 24229 "
var postData = '';
var myDate = new Date();

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
  fs.open('./all_data.txt','a',function open(err,fd){
    if(err){throw err;}
    var writeBuffer=new Buffer('['+myDate.toUTCString()+']'+d_msg),
        bufferPosition=0,
        bufferLength=writeBuffer.length,
        fileposition=null;
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
  var i=0;
  while(d_msg[i]!=':' && i<d_msg.length)
    ++i;
  if((d_msg[i+1]=='`' || d_msg[i+1]=="'") && (d_msg.search(">") >= 0) && (send == 1)) {
    fs.open('./filter_data.txt','a',function open(err,fd){
      if(err){throw err;}
      var writeBuffer=new Buffer('['+myDate.toUTCString()+']'+d_msg),
      bufferPosition=0,
      bufferLength=writeBuffer.length,
      fileposition=null;
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
  else{
    fs.open('./delete_data.txt','a',function open(err,fd){
      if(err){throw err;}
      var writeBuffer=new Buffer('['+myDate.toUTCString()+']'+d_msg),
      bufferPosition=0,
      bufferLength=writeBuffer.length,
      fileposition=null;
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


}

client.on('end',function(){
  console.log('Client unconnected.');
})

//req.end();
