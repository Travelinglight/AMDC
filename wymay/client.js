var net = require('net');
var send=1;
var login = "user bg5zzz pass 24229 "

var options = {
  host: 'rotate.aprs2.net',
  port: 14580,
  //path:'/'
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
  for(i=0;i<rec.length;++i){
    var buffer='';
    for(j;rec[j]!='\n';++j){
      buffer+=rec[j];
    }
    i=++j;
    filter(buffer+'\n');
  }
  /*while(rec[i]!=':' && i<rec.length)
    ++i;
  //console.log(rec);

    if((rec[i+1]=='`' || rec[i+1]=="'") && send == 1)
    console.log(rec);*/
})

function filter(d_msg){
  var i=0;
  while(d_msg[i]!=':' && i<d_msg.length)
    ++i;
  //console.log(rec);
  /*if(send == 1)
    console.log('received.'+send+':'+rec[i+1]);*/
    if((d_msg[i+1]=='`' || d_msg[i+1]=="'") && send == 1)
    console.log(d_msg);
}

client.on('end',function(){
  console.log('Client unconnected.');
})
