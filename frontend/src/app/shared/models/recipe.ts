import { IIngredient, IRecipe } from '../interfaces/recipe.interface';

export class Ingredient implements IIngredient {
  constructor(
    public name?: string,
    public quantity?: number,
    public description?: string,
    public measurment_unit?: string
  ) {}
}

export class Recipe implements IRecipe {
  constructor(
    public _id?: string,
    public name?: string,
    public ingredients?: IIngredient[],
    public deleted?: boolean,
    public description?: string
  ) {}
}
