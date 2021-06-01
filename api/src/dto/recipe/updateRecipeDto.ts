import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { IngredientDto } from './ingredientDto';

export class UpdateRecipeDto {
  _id: ObjectId | string;

  description?: string;

  deleted?: boolean;

  @IsArray()
  @IsNotEmpty()
  ingredients!: IngredientDto[];
}
