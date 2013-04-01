'use strict';

var App = angular.module('AngularDemoApp');


App.directive('bar', function() {
	return {
	    restrict: 'A',
	    link: function(scope, elem, attrs){
	        var chart = null;	
	             
	        scope.$watch(attrs.ngModel, function(v) {
	            var chartData = [];
	            if (v) {
		            for (var i = 0; i < v.length; i++) {
		            	chartData.push([v[i].count, v[i].name]);
		            }

		            if (!chart) {
		                chart = $.plot(elem, [chartData], {
							series : {
								bars : {									
									show : true,
									barWidth : 0.6,
									align : 'center',
									horizontal : true
								}
							},
							yaxis : {
								mode : 'categories',
								tickLength : 0
							}
						});
		                $(elem).show();
		            } else {
		                chart.setData(chartData);
		                chart.setupGrid();
		                chart.draw();
		            }
	            }	          		
	        });
	    }
	};
});

App.directive('pie', function() {
	return {
	    restrict: 'A',
	    link: function(scope, elem, attrs){
	        var chart = null;	
	             
	        scope.$watch(attrs.ngModel, function(v) {
	            var chartData = [];
	            if (v) {
		            for (var i = 0; i < v.length; i++) {
		            	chartData.push({label : v[i].name, data : v[i].count});
		            }

		            if (!chart) {
		                chart = $.plot(elem, chartData, {
							series : {
								pie : {									
									show : true
								}
							},
							legend : {
								show : false
							}							
						});
		                $(elem).show();
		            } else {
		                chart.setData(chartData);
		                chart.setupGrid();
		                chart.draw();
		            }
	            }	          		
	        });
	    }
	};
});

