import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GlobalExceptionsFilter } from './core/filters/global-exceptions.filter';
import { Product } from './food/models/products/product.model';
import { UserFriends } from './users/models/user-friends/user-friends.model';
import { UserProduct } from './food/models/user-products/user-product.model';
import { User } from './users/models/user/user.model';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'foodTrainer',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, UserFriends, Product, UserProduct],
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
export class AppModule {}
