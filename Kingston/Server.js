var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var server = app.listen(2333, function() {
  console.log("Server has started.");
})

//app.use(bodyParser());
app.use(bodyParser({
  extended: true
}));

app.post("/haha", function(req, res) {
  //var str = URLDecoder.decode(res.body,"utf-8");
  console.log(req.body);
  res.json({msg:'Yes, He is handsome!'});
});
