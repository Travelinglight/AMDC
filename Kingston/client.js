var net = require('net');
var decoder = require('./decode.js');
var send=1;
var login = "user bg5zzz pass 24229 "

var options = {
  host: 'rotate.aprs2.net',
  port: 14580,
}

var client = net.connect(options,function(){
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
    decoder.decode(d_msg);
  }
}

client.on('end',function(){
  console.log('Client unconnected.');
})
