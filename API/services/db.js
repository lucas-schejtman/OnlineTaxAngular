var mongojs = require("mongojs");
var connection_string = '127.0.0.1:27017/prototype';
var db = mongojs(connection_string, ['prototype']);

exports.getCollection = function(collectionName){
	return db.collection(collectionName);
};

exports.save = function(collectionName, document){
	// write this with promises
};