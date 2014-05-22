app.service('sessionService', function(/*$cookieStore*/){
	//var currentUser = $cookieStore.get('user') || { userId: '', username: ''};
	//$cookieStore.remove('user');

	this.create = function(userId, username){
		this.id = guid();
		this.userId = userId;
		this.userName = username;
	};
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userName = null;
	};


	function S4() {
   		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}
	function guid() {
	   	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

	return this;
});