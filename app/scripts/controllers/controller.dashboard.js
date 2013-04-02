'use strict';

var App = angular.module('AngularDemoApp');

App.controller('DashboardCtrl', function($scope, $http) {
	$http.get('json/dashboard.json').success(function(data) {
		$scope['timeline'] = data.dashboard.timeline;

		var facets = data.dashboard.facets;
		// Either PERSON, language, LOCATION, ORGANIZATION, rssh_site
		for (var i = 0; i < facets.length; i++) {
			var facet = facets[i];
			$scope[facet.id] = facet.leaders;
		}
	});
});
