import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProductController } from './controllers/product.controller';
import { UserProductController } from './controllers/user-product.controller';
import { Product, UserProduct } from './models';
import { ProductRepositoryService } from './repositories/product-repository.service';
import { ProductService } from './services/product.service';
import { UserProductService } from './services/user-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, UserProduct]), UsersModule],
  providers: [ProductService, UserProductService, ProductRepositoryService],
  exports: [ProductService, UserProductService],
  controllers: [ProductController, UserProductController],
})
export class FoodModule {}
