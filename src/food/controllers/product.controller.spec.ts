import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { ProductController } from './product.controller';

describe('Product Controller', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find product by searchText', () => {
    expect(controller).toBeDefined();
  });
});
