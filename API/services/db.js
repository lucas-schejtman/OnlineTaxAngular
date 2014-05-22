var q = require("q");
var mongojs = require("mongojs");

var connection_string = '127.0.0.1:27017/prototype';
var db = mongojs(connection_string, ['prototype']);

exports.getCollection = function(collectionName){
	return db.collection(collectionName);
};

exports.save = function(collectionName, document){
	var deferred = q.defer();
	var collection = this.getCollection(collectionName);

	collection.save(document, function(err, success){
		if(success){
			console.log("Save succeeded!");
			deferred.resolve(document);
		} else {
			console.log("Save failed!");
			deferred.reject(err);
		}
	});

	return deferred.promise;
};