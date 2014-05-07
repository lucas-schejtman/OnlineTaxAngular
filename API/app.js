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
var forms = db.collection("forms");


/*var forms = [{
	name: 'Tax credit claim form 2014 IR526',
	path: '526',
	country: 'New Zealand',
	description:'Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526).'
},{
	name: 'Tax credit claim form 2014 IR526',
	path: '526',
	country: 'New Zealand',
	description:'Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526).'
},{
	name: 'Tax credit claim form 2014 IR526',
	path: '526',
	country: 'New Zealand',
	description:'Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526).'
},{
	name: 'Tax credit claim form 2014 IR526',
	path: '526',
	country: 'New Zealand',
	description:'Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526).'
},{
	name: 'Tax credit claim form 2014 IR526',
	path: '526',
	country: 'New Zealand',
	description:'Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526).'
},{
	name: 'Tax credit claim form 2014 IR526',
	path: '526',
	country: 'New Zealand',
	description:'Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526).'
}];*/

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