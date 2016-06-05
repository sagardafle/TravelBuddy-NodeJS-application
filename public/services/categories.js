
angular.module('app').factory('CategoriesService', function() {
   var category = {
		
		"name": "category",
		"categoryname": [{
			"value": "Art"
		},
		{
			"value": "History"
		},
		{
			"value": "Party"
		},
		{
			"value": "Adventure"
		},
		{
			"value": "Nature"
		},
		{
			"value": "Casinos"
		},
		{
			"value": "Breweries"
		}
		
		]
	};
 
   return category;
});