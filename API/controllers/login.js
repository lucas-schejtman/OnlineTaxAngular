dbService = require('../services/db');

exports.login = function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    var credentials = {};
    credentials.username = req.params.username;
    credentials.password = req.params.password;

    users = dbService.getCollection('users');

    users.find({username : credentials.username}, function(err, success){
        if(success){
            if(credentials.password === success[0].password){
                var user = {};
                user.userId = success[0]._id;
                user.userName = credentials.username;
                res.send(200, user);
                return next();
            } else {
                console.log('Password does not match');
                return next(null);
            }
        } else {
            console.log('Login error ' + err);
            return next(err);
        }
    });
};