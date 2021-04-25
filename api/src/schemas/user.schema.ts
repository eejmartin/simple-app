import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Expose } from 'class-transformer';

import { ROLE } from '../enums/roleAuthority.enum';

@Schema()
export class User extends Document {
  @Expose()
  @Prop({ unique: true, required: true, max: 50 })
  userName!: string;

  @Prop({ required: true, max: 50 })
  firstName!: string;

  @Prop({ required: true, max: 50 })
  lastName!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({unique: true, required: true })
  email!: string;

  @Prop({ default: false })
  disabled?: boolean;

  @Prop({ default: false })
  deleted?: boolean;

  @Prop({ enum: ROLE })
  role!: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);
