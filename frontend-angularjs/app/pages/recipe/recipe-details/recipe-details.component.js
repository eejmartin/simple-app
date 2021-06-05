'use strict';

function Recipe() {}

// Register `recipeDetails` component, along with its associated controller and template
angular.module('recipeDetails').component('recipeDetails', {
  templateUrl: 'pages/recipe/recipe-details/recipe-details.template.html',
  controller: [
    'RecipeService',
    'RecipeFactory',
    '$location',
    function RecipeDetailsController(RecipeService, RecipeFactory, $location) {
      var data = {
          recipe: new RecipeService.Recipe(),
          formRecipe: [],
          measument_units: [
            {
              value: 'g',
              name: 'g / gram',
            },
            {
              value: 'Kg',
              name: 'Kilogram',
            },
            {
              value: 'cL',
              name: 'Centilitre',
            },
            {
              value: 'mL',
              name: 'Millilitre',
            },
            {
              value: 'L',
              name: 'Litre',
            },
            {
              value: 'teaspon',
              name: 'Teaspon',
            },
            {
              value: 'tablespon',
              name: 'Tablespon',
            },
            {
              value: 'cup',
              name: 'Cup',
            },
          ],
        },
        init = function () {
          console.log(data);
        },
        createRecipe = function (form) {
          // RecipeFactory.createRecipe(data.recipe).then(function (response) {
          //   $location.path('/recipes');
          // });
          RecipeFactory.createRecipesInSessionStorage(data.recipe);
          $location.path('/recipes');
        },
        addItem = function () {
          data.recipe.ingredients.push(new RecipeService.Ingredients());
        },
        removeItem = function (i) {
          this.data.recipe.ingredients.splice(i, 1);
        };

      init();

      return {
        data: data,
        createRecipe: createRecipe,
        addItem: addItem,
        removeItem: removeItem,
      };
    },
  ],
});
