/**
 * http://usejsdoc.org/
 */
var appVar = angular.module('app', [ "ngRoute", "highcharts-ng" ]);

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/profile', {
		controller : 'ctrl1',
		templateUrl : '/templates/profile.ejs'
	}).when('/myinterest', {
		controller : 'myinterestCtrl',
		templateUrl : '/templates/myinterest.ejs'
	}).when('/findmybuddy', {
		controller : 'findmybuddyctrl',
		templateUrl : '/templates/findmybuddy.ejs'
	}).when('/blogs', {
		controller : 'findmybuddyctrl',
		templateUrl : '/templates/blogs.ejs'
	})

} ]);

appVar.controller("ctrl1", function($scope, $http) {
	 $http({
	 		method : "POST",
	 		data : {
	 			"emailaddress" : window.location.search.split('=')[1]
	 			},
	 		url : "/getUser",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		$scope.userprofile = res.profile;
	 		//$scope.adminuserprofile.push({ selected: {}});
	 		
	 	});
	 
	 $scope.rowSelected = { selected: {}};
	 

	    // gets the template to ng-include for a table row / item
	    $scope.getTemplate = function (contact) {
	        if (contact._id === $scope.rowSelected.selected._id) return 'edit';
	        else return 'display';
	    };

	    $scope.editContact = function (contact) {
	    	$scope.rowSelected.selected = angular.copy(contact);
	    };

	    $scope.saveContact = function (idx) {
	        console.log("Saving contact");
	        $scope.userprofile[idx] = angular.copy($scope.rowSelected.selected);
	        $http({
		 		method : "POST",
		 		url : "/updateUser",
		 		data : {
		 			"id" :  $scope.userprofile[idx]._id,
		 			"emailaddress":$scope.userprofile[idx].emailaddress,
		 			"firstname":$scope.userprofile[idx].firstname,
		 			"lastname":$scope.userprofile[idx].lastname,
		 			"phone":$scope.userprofile[idx].phone
		 			},
		 	}).success(function (res) {
		 		console.log("The return value: "+JSON.stringify(res));
		 		$scope.userprofile = res.userprofile;
		 		 $http({
		 	 		method : "POST",
		 	 		data : {
			 			"emailaddress" : window.location.search.split('=')[1]
			 			},
			 		url : "/getUser",
		 	 		
		 	 	}).success(function (res) {
		 	 		console.log("The return value: "+JSON.stringify(res));
		 	 		$scope.userprofile = res.profile;
		 	 		//$scope.adminuserprofile.push({ selected: {}});
		 	 		
		 	 	});
		 		
		 	});
	        
	        $scope.reset();
	    };

	    $scope.reset = function () {
	    	$scope.rowSelected.selected = {};
	    };
	    
});

appVar.controller("myinterestCtrl", function($scope,$http,CityService,CategoriesService) {
	$scope.cities = CityService;
	$scope.activities = CategoriesService;
	
	 $http({
	 		method : "POST",
	 		data : {
	 			"emailaddress" : window.location.search.split('=')[1]
	 			},
	 		url : "/getUserInterest",
	 		
	 	}).success(function (res) {
	 		console.log("The return value: "+JSON.stringify(res));
	 		$scope.interest = res.interest;
	 		//$scope.adminuserprofile.push({ selected: {}});
	 		
	 	});
	 
	$scope.submit = function(city,activity,budget) {
		 $http({
		 		method : "POST",
		 		data : {
		 			"emailaddress" : window.location.search.split('=')[1],
		 			"city" : city,
		 			"activity" : activity,
		 			"budget" : budget
		 			},
		 		url : "/userInterest",
		 		
		 	}).success(function (res) {
		 		console.log("The return value: "+JSON.stringify(res));
		 		$scope.interest = res.interest;
		 		//$scope.adminuserprofile.push({ selected: {}});
		 		
		 	});
	}
	
});

appVar.controller("findmybuddyctrl", function($scope,$http) {
	var city =[];
	var activity = [];
	var budget = [];
	$scope.userList = [];
	$http({
 		method : "POST",
 		data : {
 			"emailaddress" : window.location.search.split('=')[1]
 			},
 		url : "/getUserInterest",
 		
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		$scope.interest = res.interest;
	 		for(var i=0;i<$scope.interest.length;i++)
			{
				if($scope.interest[i].activity.value!=undefined && $scope.interest[i].activity.value!= "" )
				{
					activity.push($scope.interest[i].activity.value);
				}
				if($scope.interest[i].city.value!=undefined && $scope.interest[i].city.value!= "" )
				{
					city.push($scope.interest[i].city.value);
				}
				if($scope.interest[i].budget!=undefined && $scope.interest[i].budget!= "" )
				{
					budget.push($scope.interest[i].budget);
				}
			}
	 		 $http({
		 	 		method : "POST",
		 	 		data : {
		 	 			"city" : city,
		 	 			"activity" : activity,
		 	 			"budget" : budget
		 	 			},
		 	 		url : "/userersWithSameInterest",
		 	 		
		 	 	}).success(function (res) {
		 	 		console.log("The return value: "+JSON.stringify(res));
		 	 		$scope.users = res.users[0];
		 	 		
		 	 	
		 	 			for(var i =0;i<$scope.users.length;i++)
		 	 			{
		 	 			if($scope.users[i].emailaddress != window.location.search.split('=')[1])
		 	 				{
		 	 				$scope.userList.push($scope.users[i]);
		 	 				}
		 	 			}
		 	 			
		 	 		//$scope.adminuserprofile.push({ selected: {}});
		 	 		
		 	 	});
	 	 
 	});
	
});

