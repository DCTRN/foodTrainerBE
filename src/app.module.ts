import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GlobalExceptionsFilter } from './core/filters/global-exceptions.filter';
import { FoodModule } from './food/food.module';
import { Product } from './food/models/products/product.model';
import { UserProduct } from './food/models/user-products/user-product.model';
import { UserFriends } from './users/models/user-friends/user-friends.model';
import { UserDetails } from './users/models/user/user-details.model';
import { UserNutritionGoals } from './users/models/user/user-nutrition-goals.model';
import { User } from './users/models/user/user.model';

@Module({
  imports: [
    AuthModule,
    FoodModule,
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: '149.156.158.132',
      port: 1521,
      serviceName: 'db1.m7-ora1.mech.pk.edu.pl',
      username: 'ST41K21z_08_TopDown',
      password: 'oraKJh5623hj',
      database: 'DB1',
      autoLoadEntities: true,
      synchronize: true,
      // dropSchema: true,
      entities: [
        UserDetails,
        UserNutritionGoals,
        User,
        UserFriends,
        Product,
        UserProduct,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ],
})
export class AppModule { }
