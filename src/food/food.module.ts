import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { UserProductController } from './controllers/user-product.controller';
import { Product, UserProduct } from './models';
import { ProductService } from './services/product.service';
import { UserProductService } from './services/user-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, UserProduct])],
  providers: [ProductService, UserProductService],
  exports: [ProductService, UserProductService],
  controllers: [ProductController, UserProductController],
})
export class FoodModule {}
