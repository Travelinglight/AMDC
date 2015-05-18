var decoder = require('./decode.js');
var fs = require('fs');

var stream = fs.createReadStream("filter_data.log");
function readLines(input, func) {
  var remaining = '';
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(line) {
  var myDate = new Date();
  line = line.substring(line.indexOf(']') + 1);
  console.log(line);
  var haha = decoder.decode(line, myDate);
  console.log(haha);
}
readLines(stream, func);
