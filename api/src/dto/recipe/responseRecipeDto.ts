import { Expose } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { MEASURMENTUNITS } from '../../enums/measurmentUnits.enum';
import { Ingredient } from '../../schemas/recipes.schema';
import { UserDto } from '../user/userDto';

@Expose()
export class ResponseRecipeDto {
  _id?: string | ObjectId;
  name?: string;
  ingredients?: Ingredient[];
  deleted?: boolean;
  user?: string;
  description?: string;

  constructor(partial: Partial<ResponseRecipeDto>) {
    Object.assign(this, partial);
  }
}

export class ResponseRecipesDto {
  constructor(public recipes: ResponseRecipeDto[]) {}
}
