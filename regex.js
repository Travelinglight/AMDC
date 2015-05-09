var fs = require('fs');
var regexp = /[A-Z0-6]{6}.*:['`]/;

fs.readFile('./delete_data.txt',function(err,data){
  if(err)
    throw err;
  var i=0;
  var rec = data.toString();
  var j=0;
  var buff = '';
  var flag = 0;
  for (i = 0; i < rec.length; ++i) {
    buff += rec[i];
    if (rec[i] == '\r') {
      flag = 1;
    }
    if ((flag) && (rec[i] == '\n')) {
      flag = 0;
      if(regexp.test(buff))
        console.log(buff);
      buff = '';
    }
  }
})
