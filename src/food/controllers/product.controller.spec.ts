import { Test, TestingModule } from '@nestjs/testing';
import { isEqual } from 'lodash';
import { of } from 'rxjs';
import { ProductDeletion, ProductDTO, ProductModification } from '../models';
import { ProductService } from '../services/product.service';
import { ProductController } from './product.controller';

const validProductDTOMock: ProductDTO = {
  producer: 'valid producer',
  name: 'valid product',
  unit: 'gram',
  amount: 100,
  kcal: 333,
  protein: 22,
  carbohydrates: 33,
  fats: 22,
  creatorId: 1,
};

const productDTOFromService: ProductDTO = {
  id: 1,
  producer: 'valid producer',
  name: 'valid product',
  unit: 'gram',
  amount: 100,
  kcal: 333,
  protein: 22,
  carbohydrates: 33,
  fats: 22,
  creatorId: 1,
};

const modifiedproductDTO: ProductDTO = {
  id: 1,
  producer: 'modified producer',
  name: 'modified product',
  unit: 'gram',
  amount: 100,
  kcal: 333,
  protein: 22,
  carbohydrates: 33,
  fats: 22,
  creatorId: 1,
};

const productModification: ProductModification = {
  userId: 1,
  product: modifiedproductDTO,
};

const productDeletion: ProductDeletion = {
  userId: 1,
  productId: 1,
};

class ProductServiceMock {
  public findProductBy(searchText: string): Promise<ProductDTO[]> {
    return of(null).toPromise();
  }
  public findProductsByUserId(userId: number): Promise<ProductDTO[]> {
    return of(null).toPromise();
  }
  public addProduct(product: ProductDTO): Promise<ProductDTO> {
    return of(null).toPromise();
  }
  public modifyProduct(product: ProductModification): Promise<ProductDTO> {
    return of(null).toPromise();
  }
  public deleteProduct(product: ProductDeletion): Promise<void> {
    return of(null).toPromise();
  }
}

describe('Product Controller', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: ProductService, useClass: ProductServiceMock }],
      controllers: [ProductController],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add product successfully', async () => {
    const addSpy = jest
      .spyOn(productService, 'addProduct')
      .mockReturnValue(of(productDTOFromService).toPromise());

    const productFromDb = await controller.addProduct(validProductDTOMock);

    expect(addSpy).toBeCalled();
    expect(isEqual(productFromDb, productDTOFromService)).toEqual(true);
  });

  it('should find product by searchText', async () => {
    const searchText = 'some text';
    const findProductBySpy = jest
      .spyOn(productService, 'findProductBy')
      .mockReturnValue(of([validProductDTOMock]).toPromise());

    const productsFromDb = await controller.findProductBy(searchText, null);

    expect(findProductBySpy).toBeCalledWith(searchText);
    expect(productsFromDb.length).toEqual(1);
    expect(isEqual(productsFromDb[0], validProductDTOMock)).toEqual(true);
  });

  it('should find products by userId', async () => {
    const userId = 1;
    const findProductsByUserIdSpy = jest
      .spyOn(productService, 'findProductsByUserId')
      .mockReturnValue(of([validProductDTOMock]).toPromise());

    const productsFromDb = await controller.findProductBy(null, userId);

    expect(findProductsByUserIdSpy).toBeCalledWith(userId);
    expect(productsFromDb.length).toEqual(1);
    expect(isEqual(productsFromDb[0], validProductDTOMock)).toEqual(true);
  });

  it('should modify product successfully', async () => {
    const modifyProductSpy = jest
      .spyOn(productService, 'modifyProduct')
      .mockReturnValue(of(modifiedproductDTO).toPromise());

    const productFromDb = await controller.modifyProduct(productModification);

    expect(modifyProductSpy).toBeCalled();
    expect(isEqual(productFromDb, modifiedproductDTO)).toEqual(true);
  });

  it('should delete product successfully', async () => {
    const deleteProductSpy = jest
      .spyOn(productService, 'deleteProduct')
      .mockReturnValue(of(null).toPromise());

    await controller.deleteProduct(productDeletion);

    expect(deleteProductSpy).toBeCalled();
  });
});
