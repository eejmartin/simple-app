import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MEASURMENTUNITS } from '../enums/measurmentUnits.enum';
import { User } from './user.schema';

export class Ingredient {
  @Prop({ required: true, max: 50 })
  name!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true })
  measurment_unit!: MEASURMENTUNITS;

  @Prop()
  description?: string;
}

@Schema()
export class Recipes extends Document {
  @Prop({ required: true, max: 50 })
  name!: string;

  @Prop({ type: Ingredient, required: true })
  ingredients!: Ingredient[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  description: string;

  @Prop({ default: false })
  deleted?: boolean;
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
