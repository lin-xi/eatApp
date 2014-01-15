app.controller('IndexController', function ($scope, $window, db, restaurant) {
    init();
    
    function init(){
    	$scope.showAlert = false;
    	$scope.restaurant = null;

    	var table_sql = 'CREATE TABLE IF NOT EXISTS restaurant (id INTEGER PRIMARY KEY, name TEXT, address TEXT, star NUMERIC, chooseTimes NUMERIC)';
		db.execute(table_sql, []);

    	restaurant.get(function(result){
    		$scope.$apply(function(){
    			$scope.restaurant = result;
    		});
    	});
    }
});

app.controller('ListController', function ($scope, $location, restaurant) {
	init();
	function init(){
		$scope.showAdd = false;
		$scope.stars = [
			{star:1, name:'一星'},
			{star:2, name:'二星'},
			{star:3, name:'三星'},
			{star:4, name:'四星'},
			{star:5, name:'五星'}
		];
		getData();

		function getData(){
			restaurant.get(function(result){
				if(result.length==0) return;

				$scope.$apply(function(){
					$scope.restaurant = result;
					$scope.showAdd = false;
				});
			});
		}

		$scope.doSave = function(){
			if(!$scope.name || !$scope.star){
				return;
			}
			restaurant.put($scope.name, '', $scope.star.star, function(){
				getData();
			});
		};

		$scope.doAdd = function(){
			$scope.showAdd = true;
		};

		$scope.doBack = function(){
			$scope.showAdd = false;
		};

		$scope.doDelete = function(id){
			restaurant.remove(id, function(){
				getData();
			});
		};
	}
});

app.controller('AboutController', function ($scope) {
});
