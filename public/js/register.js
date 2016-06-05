var appVar = angular.module('app', []);

appVar.controller('regCtrl',function($scope,$http){
	
	$scope.registration = function(){
     var emailaddress = $scope.user.emailaddress;
     var firstname = $scope.user.firstname;
     var lastname = $scope.user.lastname;
     var password = $scope.user.password;
     var phone = $scope.user.phone;
 
     $http({
 		method : "POST",
 		url : "/userLogin",
 		data : {
 			"emailaddress" : emailaddress,
 			"firstname": firstname,
 			"lastname": lastname,
 			"password" : password,
 			"phone" : phone,

 			}
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		if(res)
 		{ 
 			console.log("successfully loggedin");
 			//var data = res.username;
 		
 			console.log("role is: "+ res.role);
 			window.location.assign("/home");
 			
 		}
 		else
 		{
 			console.log("Auhentication failure after success");
 		}
 		
 		}).error(function (error){
 		console.log("error while login: " +error);
 	});
	};
	
	$scope.previewFile = function(){
	       var preview = document.querySelector('img'); //selects the query named img
	       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
	       var reader  = new FileReader();

	       reader.onloadend = function () {
	           preview.src = reader.result;
	       }

	       if (file) {
	           reader.readAsDataURL(file); //reads the data as a URL
	       } else {
	           preview.src = "";
	       }
	  }
});