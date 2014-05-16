dbService = require('../services/db');

exports.findAll = function (req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');

    submissions = dbService.getCollection('submissions');
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
};

exports.add = function (req , res , next){
    var submission = {};
    submission.name = req.params.name;
    submission.description = req.params.description;
    submission.country = req.params.country;
    submission.data = req.params.data;
    submission.date = req.params.date;
 
    res.setHeader('Access-Control-Allow-Origin','*');

    submissions = dbService.getCollection('submissions');
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
};