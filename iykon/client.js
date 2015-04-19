//var http = require('http');
var net = require('net');

var options = {
  host: 'hangzhou.aprs2.net',
  port: 14580,
  //path:'/'
}
/*
var request = http.get(options,function(res){
  var rec="";
  res.on('data',function(block){
    rec += block;
  });
  res.on('end',function(){
    console.log(rec);
  });
  //console.log(res);
  console.log('Connected.');
}).on('error',function(error){
  console.log('Error: '+error.message);
})
*/

var client = net.connect(options,function(){
  console.log('Client connected.');
}).on('error',function(error){
  console.log('Error: '+error.message);
})

client.on('data',function(data){
  var rec = data.toString();
  console.log(rec);
})

process.stdin.on('data',function(data){
  client.write(data.toString());
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
