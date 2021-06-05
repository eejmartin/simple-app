'use strict';

// Register `recipesList` component, along with its associated controller and template
angular.module('recipesList').component('recipesList', {
  templateUrl: 'pages/recipe/recipes-list/recipes-list.template.html',
  controller: [
    'RecipeService',
    'RecipeFactory',
    '$location',
    function RecipesListController(RecipeService, RecipeFactory, $location) {
      var data = {
          recipes: [],
          orderProp: 'name',
        },
        loadData = function () {
          RecipeFactory.getRecipes().then(function (recipes) {
            data.recipes = recipes;
            console.log(data.recipes);
          });
        },
        init = function () {
          loadData();
        };

      init();

      return {
        data: data,
      };
    },
  ],
});
