import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { IngredientDto } from './ingredientDto';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  description?: string;

  @IsArray()
  @IsNotEmpty()
  ingredients!: IngredientDto[];
}
