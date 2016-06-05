
angular.module('app').factory('CityService', function() {
   var cities = {
		
		"name": "cities",
		"citiname": [{
			"value": "Ketchum"
		},
		{
			"value": "Aberdeen"
		},
		{
			"value": "Albion"
		},
		{
			"value": "Almo"
		},
		{
			"value": "Alta"
		},
		{
			"value": "American Falls"
		}
		
		]
	};
 
   return cities;
});