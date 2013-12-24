var app = angular.module('eatApp', ['ngRoute', 'ngSanitize', 'ngAnimate']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
	//Define a route that has a route parameter in it (:customerID)
	.when('/index',
		{
			controller: 'IndexController',
			templateUrl: 'app/views/main.html'
		})
	.when('/list',
		{
			controller: 'ListController',
			templateUrl: 'app/views/list.html'
		})
	.when('/about',
		{
			controller: 'AboutController',
			templateUrl: 'app/views/about.html'
		})
	.otherwise({ redirectTo: '/index' });
	
});





