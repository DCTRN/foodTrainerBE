import { Test, TestingModule } from '@nestjs/testing';
import {
  addUserProductMock1,
  invalidModifyProductMock1,
  modifyProductMock1,
  user1,
  userProduct1,
  userProduct2,
  userProductDeletionMock1,
  userProductsByDateDTO1,
  userProductsByDateRangeDTO1,
} from '@tests/food/models';
import { UsersServiceMock } from '@tests/users/services';
import { of } from 'rxjs';
import { UsersService } from 'src/users/repositories/users.service';
import {
  UserProduct,
  UserProductDTO,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
} from '../models';
import { UserProductRepositoryService } from '../repositories/user-product-repository.service';
import { UserProductService } from './user-product.service';

export class UserProductRepositoryServiceMock {
  public findProductByDate(
    date: UserProductsByDateDTO,
  ): Promise<UserProduct[]> {
    return of(null).toPromise();
  }
  public findProductByDateRange(
    date: UserProductsByDateRangeDTO,
  ): Promise<UserProduct[]> {
    return of(null).toPromise();
  }
  public add(userProduct: UserProductDTO): Promise<UserProduct> {
    return of(null).toPromise();
  }
  public update(userProduct: UserProductDTO): Promise<UserProduct> {
    return of(null).toPromise();
  }
  public delete(id: number): Promise<void> {
    return of(null).toPromise();
  }
}

describe('UserProductService', () => {
  let service: UserProductService;
  let userProductRepositoryService: UserProductRepositoryService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProductService,
        {
          provide: UserProductRepositoryService,
          useClass: UserProductRepositoryServiceMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userProductRepositoryService = module.get<UserProductRepositoryService>(
      UserProductRepositoryService,
    );
    service = module.get<UserProductService>(UserProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add product successfully', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(user1).toPromise());
    spyOn(userProductRepositoryService, 'add').and.returnValue(
      of(userProduct1).toPromise(),
    );

    const userProductDTO = await service.addUserProduct(addUserProductMock1);

    expect(userProductRepositoryService.add).toHaveBeenCalled();
    expect(userProductDTO.id).toEqual(userProduct1.id);
    expect(userProductDTO.product.id).toEqual(userProduct1.product.id);
    expect(userProductDTO.userId).toEqual(userProduct1.user.id);
  });

  it('should fail to add product due to invalid userId', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(null).toPromise());
    spyOn(userProductRepositoryService, 'add').and.returnValue(
      of(userProduct1).toPromise(),
    );

    try {
      await service.addUserProduct(addUserProductMock1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(userProductRepositoryService.add).not.toHaveBeenCalled();
    }
  });

  it('should fail to modify product due to not matching userId', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(user1).toPromise());
    spyOn(userProductRepositoryService, 'update').and.returnValue(
      of(userProduct1).toPromise(),
    );

    try {
      await service.modifyUserProduct(invalidModifyProductMock1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(userProductRepositoryService.update).not.toHaveBeenCalled();
    }
  });

  it('should fail to modify product due to invalid userId', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(null).toPromise());
    spyOn(userProductRepositoryService, 'update').and.returnValue(
      of(userProduct1).toPromise(),
    );

    try {
      await service.modifyUserProduct(invalidModifyProductMock1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(userProductRepositoryService.update).not.toHaveBeenCalled();
    }
  });

  it('should  modify product successfully', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(user1).toPromise());
    spyOn(userProductRepositoryService, 'update').and.returnValue(
      of(userProduct2).toPromise(),
    );

    const userProductDTO = await service.modifyUserProduct(modifyProductMock1);

    expect(userProductRepositoryService.update).toHaveBeenCalled();
    expect(userProductDTO.id).toEqual(modifyProductMock1.product.id);
    expect(userProductDTO.product.id).toEqual(
      modifyProductMock1.product.product.id,
    );
    expect(userProductDTO.userId).toEqual(modifyProductMock1.userId);
  });

  it('should fail to find products by date successfully', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(user1).toPromise());
    spyOn(userProductRepositoryService, 'findProductByDate').and.returnValue(
      of([userProduct1]).toPromise(),
    );

    const userProductsDTO = await service.findProductByDate(
      userProductsByDateDTO1,
    );

    expect(userProductRepositoryService.findProductByDate).toHaveBeenCalled();
    expect(userProductsDTO.length).toEqual(1);
    expect(userProductsDTO[0].id).toEqual(userProduct1.product.id);
    expect(userProductsDTO[0].product.id).toEqual(userProduct1.product.id);
    expect(userProductsDTO[0].userId).toEqual(userProduct1.user.id);
  });

  it('should fail to find products by date due to invalid userId', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(null).toPromise());
    spyOn(userProductRepositoryService, 'findProductByDate').and.returnValue(
      of(userProduct1).toPromise(),
    );

    try {
      await service.findProductByDate(userProductsByDateDTO1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(
        userProductRepositoryService.findProductByDate,
      ).not.toHaveBeenCalled();
    }
  });

  it('should fail to find products by date successfully', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(user1).toPromise());
    spyOn(
      userProductRepositoryService,
      'findProductByDateRange',
    ).and.returnValue(of([userProduct1]).toPromise());

    const userProductsDTO = await service.findProductByDateRange(
      userProductsByDateRangeDTO1,
    );

    expect(
      userProductRepositoryService.findProductByDateRange,
    ).toHaveBeenCalled();
    expect(userProductsDTO.length).toEqual(1);
    expect(userProductsDTO[0].id).toEqual(userProduct1.product.id);
    expect(userProductsDTO[0].product.id).toEqual(userProduct1.product.id);
    expect(userProductsDTO[0].userId).toEqual(userProduct1.user.id);
  });

  it('should fail to find products by date range due to invalid userId', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(null).toPromise());
    spyOn(
      userProductRepositoryService,
      'findProductByDateRange',
    ).and.returnValue(of(userProduct1).toPromise());

    try {
      await service.findProductByDateRange(userProductsByDateRangeDTO1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(
        userProductRepositoryService.findProductByDateRange,
      ).not.toHaveBeenCalled();
    }
  });

  it('should delete user product successfully', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(user1).toPromise());
    spyOn(userProductRepositoryService, 'delete').and.returnValue(
      of(null).toPromise(),
    );

    await service.deleteUserProduct(userProductDeletionMock1);

    expect(userProductRepositoryService.delete).toHaveBeenCalled();
  });

  it('should fail to delete product due to invalid userId', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(null).toPromise());
    spyOn(userProductRepositoryService, 'delete').and.returnValue(
      of(null).toPromise(),
    );

    try {
      await service.deleteUserProduct(userProductDeletionMock1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(userProductRepositoryService.delete).not.toHaveBeenCalled();
    }
  });
});
