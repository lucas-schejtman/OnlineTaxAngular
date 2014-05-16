var restify = require('restify');
var mongojs = require("mongojs");

var server = restify.createServer({ name: 'api' });

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.fullResponse())
      .use(restify.bodyParser())
      .use(restify.CORS());

var connection_string = '127.0.0.1:27017/prototype';
var db = mongojs(connection_string, ['prototype']);
var users = db.collection("users");
var forms = db.collection("forms");
var submissions = db.collection("submissions");

server.post('site/login', login);

function login(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    var credentials = {};
    credentials.username = req.params.username;
    credentials.password = req.params.password;

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

server.get('api/forms', findAllForms);

function findAllForms(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    forms.find().limit(20).sort({postedOn : -1} , function(err , success){
        if(success){
            console.log('Response success '+success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        } 
    }); 
}

server.post('api/forms', addNewForm);

function addNewForm(req , res , next){
    var form = {};
    form.name = req.params.name;
    form.description = req.params.description;
    form.path = req.params.path;
    form.country = req.params.country;
    form.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    forms.save(form, function(err , success){
        if(success){
            console.log('Response success '+success);
            res.send(201 , form);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        }
    });
}

server.get('api/submissions', findAllSubmissions);

function findAllSubmissions(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    submissions.find().limit(20).sort({postedOn : -1} , function(err , success){
        if(success){
            console.log('Response success '+success);
            res.send(200 , success);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        } 
    }); 
}

server.post('api/submissions', addSubmission);

function addSubmission(req , res , next){
    var submission = {};
    submission.name = req.params.name;
    submission.description = req.params.description;
    submission.country = req.params.country;
    submission.data = req.params.data;
    submission.date = req.params.date;
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    submissions.save(submission, function(err , success){
        if(success){
            console.log('Response success '+success);
            res.send(201 , submission);
            return next();
        }else{
            console.log('Response error '+err);
            return next(err);
        }
    });
}