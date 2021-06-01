import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/simple_db', {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-audit'));
        return connection;
      },
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
    RecipesModule,
  ],
  controllers: [],
})
export class AppModule {}
