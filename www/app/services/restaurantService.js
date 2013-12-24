app.factory('restaurant', ['db', function (db){
	
    function put(name, address, star, fn) {
    	db.execute("INSERT INTO restaurant (name, address, star, chooseTimes) VALUES (?, ?, ?, ?)", [name, address, star, 0], function(tx, res) {
    	   fn && fn();
        });
    }

    function get(fn){
    	db.execute('SELECT * FROM restaurant', [], function(tx, res){
    		var result = [];
    		for(var i=0, ii=res.rows.length; i<ii; i++){
    			result.push(res.rows.item(i));
    		}
    		fn(result);
    	});
    }

    function remove(id, fn) {
        db.execute("DELETE FROM restaurant where id = ?", [id], function(tx, res) {
           fn && fn();
        });
    }

    return {
    	put: put,
    	get: get,
        remove: remove
    };
}]);