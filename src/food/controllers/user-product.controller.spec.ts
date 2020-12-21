import { Test, TestingModule } from '@nestjs/testing';
import {
  addUserProductMock1,
  modifyProductMock1,
  userProductDeletionMock1,
  userProductsByDateDTO1,
  userProductsByDateRangeDTO1,
} from '@tests/food/models';
import { UserProductServiceMock } from '@tests/food/services';
import { UserProductService } from '../services/user-product.service';
import { UserProductController } from './user-product.controller';

describe('UserProduct Controller', () => {
  let controller: UserProductController;
  let userProductService: UserProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProductController],
      providers: [
        {
          provide: UserProductService,
          useClass: UserProductServiceMock,
        },
      ],
    }).compile();

    userProductService = module.get<UserProductService>(UserProductService);
    controller = module.get<UserProductController>(UserProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add product', async () => {
    spyOn(userProductService, 'addUserProduct');

    await controller.addUserProduct(addUserProductMock1);

    expect(userProductService.addUserProduct).toHaveBeenCalled();
  });

  it('should modify product', async () => {
    spyOn(userProductService, 'modifyUserProduct');

    await controller.modifyUserProduct(modifyProductMock1);

    expect(userProductService.modifyUserProduct).toHaveBeenCalled();
  });

  it('should find product by date', async () => {
    spyOn(userProductService, 'findProductByDate');

    await controller.findProductByDate(userProductsByDateDTO1);

    expect(userProductService.findProductByDate).toHaveBeenCalled();
  });

  it('should find product by date range', async () => {
    spyOn(userProductService, 'findProductByDateRange');

    await controller.findProductByDateRange(userProductsByDateRangeDTO1);

    expect(userProductService.findProductByDateRange).toHaveBeenCalled();
  });

  it('should delete product', async () => {
    spyOn(userProductService, 'deleteUserProduct');

    await controller.deleteUserProduct(userProductDeletionMock1);

    expect(userProductService.deleteUserProduct).toHaveBeenCalled();
  });
});
