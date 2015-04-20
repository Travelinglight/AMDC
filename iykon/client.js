//var http = require('http');
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
}).on('error',function(error){
  console.log('Error: '+error.message);
})

client.on('data',function(data){
  var i=0;
  var rec = data.toString();
  while(rec[i]!=':' && i<rec.length)
    ++i;
  //console.log(rec);
  /*if(send == 1)
    console.log('received.'+send+':'+rec[i+1]);*/
  if(rec[i+1]=='0' && (rec[i+2]=='x' || rec[i+2]=='X') && rec[i+3]=='1' && send == 1)
    console.log('This is a message:\n'+rec);
  if(rec[i+1]=='`' && send == 1)
    console.log(rec);
})

process.stdin.on('data',function(data){
  var str;
  str = data.toString();
  if(str[0] == '-'){
    str = str.substr(1,str.length-1);
    client.write(login+str);
  }
  else if(str == 'p\r\n'){
    send = 0;
  }
  else if(str=='s\r\n'){
    send = 1;
  }
  else{
    client.write(str);
  }
})

/*
client.on('data',function(data){
  var rec=data.toString();
  var setfilter = '# filter t/p\n';
  var times=0;
  console.log(rec);
  //console.log('# javAPRSSrvr 3.15b08\r\n');
  if(rec=='# javAPRSSrvr 3.15b08\r\n'){
    console.log('Connect to hangzhou.aprs2.net.');
    client.write('user BG5ZZ pass 24229 vers PC-iykon\n');
  }else{
    if(rec[71]=='p' && rec[72]=='i' &&rec[73]=='n' &&rec[74]=='g' && setfilter[0]=='#'){
      client.write(setfilter).
      setfilter = '';
      times++;
    }else{
      if(times==10){
        times = 0;
      }
    }
  }
  //console.log('shit');
})
*/
client.on('end',function(){
  console.log('Client unconnected.');
})
