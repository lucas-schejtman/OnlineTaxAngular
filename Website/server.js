var express  = require('express');
var app      = express(); 							

app.use(express.static(__dirname + '/public')); 	

app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

app.get('*', function(req, res) {
	res.sendfile(__dirname  + '/public/Index.html');
});

app.listen(3000);
console.log("App listening on port 3000");