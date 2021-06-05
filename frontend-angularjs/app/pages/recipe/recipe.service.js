'use strict';

// these two are proxies to angular.Module.provide
// factory - creates the respective service by invoking the function and using its return value as the service
// service - will treat it as an constructor and invoke it with the new keyword to create the service

const url = 'http://localhost:3000/recipes';

angular.module('recipe').factory('RecipeFactory', [
  // '$resource',
  '$http',
  '$filter',
  '$q',
  // $http - communication with the remote HTTP servers via the browser’s XMLHttpRequest object or via JSONP
  // $resource object that interact with RESTful server-side data sources
  function ($http, $filter, $q) {
    return {
      getRecipes: function () {
        return $http.get(url).then(function (response) {
          return response.data.recipes;
        });
      },
      createRecipe: function (recipe) {
        return $http.post(url, recipe).then(function (response) {
          return response.data.recipe;
        });
      },
    };
    // return $resource('/recipes', {}, {
    //   query: {
    //     method: 'GET',
    //     params: {recipesId: 'recipes'},
    //     isArray: true
    //   }
    // });
  },
]);

angular.module('recipe').service('RecipeService', [
  function () {
    var scope = this;
    this.Ingredients = function (name, quantity, measurment_unit, description) {
      this.name = name;
      this.quantity = quantity;
      this.measurment_unit = measurment_unit;
      this.description = description;
    };

    this.Recipe = function (name, ingredients, description) {
      !!ingredients
        ? (ingredients = ingredients)
        : (ingredients = [new scope.Ingredients()]);
      this.name = name;
      this.ingredients = [...ingredients];
      this.description = description;
    };

    return {
      Ingredients: this.Ingredients,
      Recipe: this.Recipe,
    };
  },
]);
