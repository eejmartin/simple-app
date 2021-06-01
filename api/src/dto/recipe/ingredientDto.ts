import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MEASURMENTUNITS } from '../../enums/measurmentUnits.enum';

export class IngredientDto {
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @IsEnum(MEASURMENTUNITS)
  @IsNotEmpty()
  measurment_unit!: MEASURMENTUNITS;

  @IsString()
  description?: string;
}
