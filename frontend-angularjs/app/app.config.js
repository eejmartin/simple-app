'use strict';

angular.module('simpleApp').config([
  '$routeProvider',
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/recipes', {
        template: '<recipes-list></recipes-list>',
      })
      .when('/recipes/new', {
        template: '<recipe-details></recipe-details>',
      })
      .when('/recipes/:id', {
        template: '<recipe-details></recipe-details>',
      })
      .otherwise('/recipes');
  },
]);
