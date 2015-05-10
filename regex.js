var fs = require('fs');
var regexp = /[A-Z0-6]{6}.*:[`'][\x26-\x7f][\x26-\x61][\x1c-\x7f][\x1c-\x7f][\x1c-\x7d][\x1c-\x7f]/;

fs.readFile('./delete_data.log',function(err,data){
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
