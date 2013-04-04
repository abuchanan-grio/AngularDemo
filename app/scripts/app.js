'use strict';

angular.module('AngularDemoApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/docs', {
        templateUrl: 'views/documents.html',
        controller: 'DocumentsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
