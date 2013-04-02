'use strict';

angular.module('AngularDemoApp')

.directive('barchart', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart : {
          renderTo : element[0],
          type : 'bar',
          height : attrs.height || null,
          width : attrs.width || null
        },
        title : {
          text : attrs.title || ''
        },
        legend : {
          enabled : false
        }
      };

      scope.$watch(function() {
          return attrs.value;
      }, function(value) {
          if(!attrs.value) return;

          // Construct data          
          var v = JSON.parse(attrs.value);
          var categories = [];
          var data = [];
          for (var i = 0; i < v.length; i++) {
            categories.push(v[i].name);
            data.push(v[i].count);
          }

          // We need deep copy in order to NOT override original chart object.
          // This allows us to override chart data member and still the keep
          // our original renderTo will be the same
          var deepCopy = true;
          var newSettings = {};

          var barSettings = {
            xAxis : {
              categories : categories,
              title : {
                text : null
              }
            },
            yAxis : {
              min : 0,
              title : {
                text : ''
              },
              labels : {
                overflow : 'justify'
              }
            },
            series : [{
              data : data
            }]
          }

          $.extend(deepCopy, newSettings, chartsDefaults, barSettings);
          var chart = new Highcharts.Chart(newSettings);
        });
      }
    }
})

.directive('piechart', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart : {
          renderTo : element[0],
          height : attrs.height || null,
          width : attrs.width || null
        },
        title : {
          text : attrs.title || ''
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              color: '#000000',
              connectorColor: '#000000',
              formatter: function() {
                  return this.point.name + ': ' + this.point.y;
              }
            }
          }
        }
      };

      scope.$watch(function() {
          return attrs.value;
      }, function(value) {
          if(!attrs.value) return;

          // Construct data          
          var v = JSON.parse(attrs.value);
          var data = [];
          for (var i = 0; i < v.length; i++) {
            data.push([v[i].name, v[i].count]);
          }

          // We need deep copy in order to NOT override original chart object.
          // This allows us to override chart data member and still the keep
          // our original renderTo will be the same
          var deepCopy = true;
          var newSettings = {};

          var pieSettings = {
            series : [{
              type : 'pie',
              data : data
            }]
          }

          $.extend(deepCopy, newSettings, chartsDefaults, pieSettings);
          var chart = new Highcharts.Chart(newSettings);
        });
      }
    }
})