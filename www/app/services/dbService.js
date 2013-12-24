app.service('db', function (){

	var db = this.db = window.openDatabase("restaurant", "1.0", "restaurant", 65536);
	
	this.execute = function(sql, param, fn){
		db.transaction(function(tx){
        	tx.executeSql(sql, param, function(tx, res) {
        		fn && fn(tx, res);
        	});
	    });
	};
	
});