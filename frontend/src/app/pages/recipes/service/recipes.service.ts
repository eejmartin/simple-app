import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRecipe } from '../../../shared/interfaces/recipe.interface';
import { ApiService } from '../../../shared/services/api/api.service';

@Injectable()
export class RecipesService {
  constructor(private apiService: ApiService) {}

  fetchRecipes(): Observable<IRecipe[]> {
    return this.apiService
      .get(`recipes`)
      .pipe(map((res) => res['recipes'] as IRecipe[]));
  }

  createRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.apiService
      .post(`recipes`, recipe)
      .pipe(map((res: IRecipe) => res));
  }

  updateRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.apiService
      .put(`recipes`, recipe)
      .pipe(map((res: IRecipe) => res));
  }

  getRecipeById(recipeId: string): Observable<IRecipe> {
    return this.apiService
      .get(`recipes?id=${recipeId}`)
      .pipe(map((res: IRecipe) => res));
  }

  deleteRecipeById(recipeId: string): Observable<IRecipe> {
    return this.apiService
      .delete(`recipes?id=${recipeId}`)
      .pipe(map((res: IRecipe) => res));
  }
}
