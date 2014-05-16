var prototype = {
    insertForms: function(num){
        var collection = db.getSiblingDB("prototype").getCollection("forms");
        
        for(i = 0; i < num; i++){
            collection.insert({ "name": "Tax credit claim form 2014 IR526",
                                                    "path": "526",
                                                    "country": "New Zealand",
                                                    "description":"Complete this form to claim tax credits for donations for the tax year 1 April 2013 to 31 March 2014. If you are making a claim for the years 2011 and before, or the 2012 year, please use either the Tax credit claim form 2000-2011 (IR526) and/or the Tax credit claim form 2013 (IR526)."
            });
		}
    },
    insertUser: function(username, password){
        var collection = db.getSiblingDB("prototype").getCollection("users");

		collection.insert({"username":username, "password":password});
    }
}