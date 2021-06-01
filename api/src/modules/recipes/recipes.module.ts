import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../auth/auth.module';
import { Recipes, RecipesSchema } from '../../schemas/recipes.schema';
import { UsersModule } from '../users/users.module';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeatureAsync([
      {
        name: Recipes.name,
        useFactory: () => {
          const schema = RecipesSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [RecipesService],
  controllers: [RecipesController],
  exports: [RecipesService],
})
export class RecipesModule {}
