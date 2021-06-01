export interface IIngredient {
  name?: string;
  quantity?: number;
  description?: string;
  measurment_unit?: string;
}

export interface IRecipe {
  _id?: string;
  name?: string;
  description?: string;
  ingredients?: IIngredient[];
  deleted?: boolean;
}
