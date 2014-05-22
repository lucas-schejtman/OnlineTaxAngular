var express  = require('express');
var bodyParser  = require('body-parser');
var cookieParser= require('cookie-parser');
//var session  = require('express-session');
var app      = express(); 							

app.use(express.static(__dirname + '/public'))   
   .use(bodyParser())
   .use(cookieParser());
   //.use(session({ secret: 'super secret', name: 'sid'}));

// Uncomment for extra logging
/*app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});*/

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('*', function(req, res) {
	/*var userId = '', username = '';
	if(req.cookies.user){
		var user = req.cookies.user;
		console.log(user);
		userId = user.userId || '';
		username = user.username || '';
	}
	res.cookie('user', JSON.stringify({'userId':userId, 'username':username}), { maxAge: 900000, httpOnly: true });*/

	res.sendfile(__dirname  + '/public/Index.html');
});

// quick hack, refactor this
var mongojs = require("mongojs");
var connection_string = '127.0.0.1:27017/prototype';
var db = mongojs(connection_string, ['prototype']);
var users = db.collection('users');

app.post('/login', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    var credentials = {};
    credentials.username = req.body.username;
    credentials.password = req.body.password;

    users.find({username : credentials.username}, function(err, success){
        if(success){
            if(credentials.password === success[0].password){
                var user = {};
                user.userId = success[0]._id;
                user.username = credentials.username;
                //res.cookie('user', JSON.stringify(user), { maxAge: 900000, httpOnly: true });
                res.send(200, user);
                res.end();
                //return next();
            } else {
                console.log('Password does not match');
                return next(null);
            }
        } else {
            console.log('Login error ' + err);
            return next(err);
        }
    });
});

/*app.get('/logout', function(req, res) {
	var userId = '', username = '';

	res.clearCookie('user');

	res.sendfile(__dirname  + '/public/Index.html');
});*/


app.listen(3000);
console.log("App listening on port 3000");