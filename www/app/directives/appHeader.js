app.directive('appHeader', function() {
	return {
		restrict: 'AE',
		controller: function($scope) {
			$scope.showMenu = false;

	        $scope.onMenu = function(e) {
	        	$scope.showMenu = true;
	        };

            $scope.exit = function(){
                navigator.app.exitApp();
            };
      	},
		templateUrl: 'app/views/head.html',
      	link: function(scope, element, attr){
      		element.find('.menu li').on('click', function(e){
				scope.$apply(function(){
					scope.showMenu = false;
				});
      		});

      		document.addEventListener("menubutton", function(e){
        		scope.$apply(function(){
  					scope.showMenu = true;
  				});
        	}, false);
      	}
	};

});