import { ObjectId } from 'mongoose';
import { MEASURMENTUNITS } from '../../enums/measurmentUnits.enum';
import { Ingredient } from '../../schemas/recipes.schema';

export class RecipeDto {
  constructor(
    public _id?: string | ObjectId,
    public name?: string,
    public ingredients?: Ingredient[],
    public deleted?: boolean,
    public user?: string,
    public measurment_unit?: MEASURMENTUNITS,
    public description?: string
  ) {}
}
