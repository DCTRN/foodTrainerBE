/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { isEqual } from 'lodash';
import { of } from 'rxjs';
import { UserDTO } from 'src/users/models/user/user-dto.model';
import { User } from 'src/users/models/user/user.model';
import { UsersService } from 'src/users/repositories/users.service';
import { DeleteResult } from 'typeorm';
import { Product, ProductDeletion, ProductDTO } from '../models';
import { ProductRepositoryService } from '../repositories/product-repository.service';
import { ProductService } from './product.service';

const userMock1: User = {
  id: 1,
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  hashPassword: () => {},
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
};

const userMock2: User = {
  id: 2,
  username: 'usernameMock2',
  password: 'secretPassword123',
  email: 'someemail2@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123623123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  hashPassword: () => {},
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
};

const productMock: Product = {
  id: 1,
  producer: 'producer1',
  name: 'name1',
  unit: 'gram',
  amount: 100,
  kcal: 333,
  protein: 33,
  carbohydrates: 22,
  fats: 11,
  creator: userMock1,
  userProducts: [],
};

const modifiedProducer = 'producer1Modified';
const modifiedName = 'name1Modified';
const modifiedUnit = 'gramModified';
const modifiedAmount = 101;
const modifiedKcal = 421;
const modifiedProtein = 41;
const modifiedCarbohydrates = 222;
const modifiedFats = 11;

const productMockModified: Product = {
  id: 3,
  producer: modifiedProducer,
  name: modifiedName,
  unit: modifiedUnit,
  amount: modifiedAmount,
  kcal: modifiedKcal,
  protein: modifiedProtein,
  carbohydrates: modifiedCarbohydrates,
  fats: modifiedFats,
  creator: userMock1,
  userProducts: [],
};

const modifiedProductDTO: ProductDTO = {
  id: 3,
  producer: modifiedProducer,
  name: modifiedName,
  unit: modifiedUnit,
  amount: modifiedAmount,
  kcal: modifiedKcal,
  protein: modifiedProtein,
  carbohydrates: modifiedCarbohydrates,
  fats: modifiedFats,
  creatorId: 1,
};

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

class ProductRepositoryServiceMock {
  public findProductBy(searchText: string): Promise<Product[]> {
    return of(null).toPromise();
  }

  public async findProductsByUserId(userId: number): Promise<Product[]> {
    return of(null).toPromise();
  }

  public async findById(id: number): Promise<Product> {
    return of(null).toPromise();
  }

  public add(product: Product): Promise<Product> {
    return of(null).toPromise();
  }

  public update(product: Product): Promise<Product> {
    return of(null).toPromise();
  }

  public delete(id: number): Promise<void> {
    return of(null).toPromise();
  }
}

export class UsersServiceMock {
  public async add(user: UserDTO): Promise<User> {
    return of(null).toPromise();
  }

  public async update(id: number, user: Partial<User>): Promise<User> {
    return of(null).toPromise();
  }

  public async findById(id: number): Promise<User> {
    return of(null).toPromise();
  }

  public async findByUsername(username: string): Promise<User> {
    return of(null).toPromise();
  }

  public async findBySimilarToUsername(username: string): Promise<Array<User>> {
    return of(null).toPromise();
  }

  public async findAll(): Promise<Array<User>> {
    return of(null).toPromise();
  }

  public delete(id: number): Promise<DeleteResult> {
    return of(null).toPromise();
  }
}

describe('ProductService', () => {
  let service: ProductService;
  let productRepositoryService: ProductRepositoryService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepositoryService,
          useClass: ProductRepositoryServiceMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    productRepositoryService = module.get<ProductRepositoryService>(
      ProductRepositoryService,
    );
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add product successfully', async () => {
    const addSpy = jest
      .spyOn(productRepositoryService, 'add')
      .mockReturnValue(of(productMock).toPromise());

    await service.addProduct(validProductDTOMock);

    expect(addSpy).toBeCalledWith(validProductDTOMock);
  });

  it('should find product by searchtext successfully', async () => {
    const searchText = 'searchText';
    const findProductBySpy = jest
      .spyOn(productRepositoryService, 'findProductBy')
      .mockReturnValue(of([productMock]).toPromise());

    await service.findProductBy(searchText);

    expect(findProductBySpy).toBeCalledWith(searchText);
  });

  it('should fail to find product by searchtext', async () => {
    try {
      await service.findProductBy(null);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('should find products by userId successfully', async () => {
    const userId = 1;
    const findProductsByUserIdSpy = jest
      .spyOn(productRepositoryService, 'findProductsByUserId')
      .mockReturnValue(of([productMock]).toPromise());

    await service.findProductsByUserId(userId);

    expect(findProductsByUserIdSpy).toBeCalledWith(userId);
  });

  it('should fail to  find products by userId', async () => {
    try {
      await service.findProductsByUserId(0);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it('should modify product successfully', async () => {
    const validParam = { userId: 1, product: modifiedProductDTO };
    spyOn(usersService, 'findById').and.returnValue(of(userMock2).toPromise());
    spyOn(productRepositoryService, 'findById').and.returnValue(
      of(productMock).toPromise(),
    );
    const updateSpy = jest
      .spyOn(productRepositoryService, 'update')
      .mockReturnValue(of(productMockModified).toPromise());

    const product = await service.modifyProduct(validParam);

    expect(updateSpy).toBeCalled();
    expect(isEqual(modifiedProductDTO, product));
    expect(usersService.findById).toHaveBeenCalled();
  });

  it('should throw error on unauthorized modification', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(userMock2).toPromise());
    spyOn(productRepositoryService, 'findById').and.returnValue(
      of(productMock).toPromise(),
    );
    const validParam = { userId: 2, product: modifiedProductDTO };
    const updateSpy = jest
      .spyOn(productRepositoryService, 'update')
      .mockReturnValue(of(productMockModified).toPromise());

    try {
      await service.modifyProduct(validParam);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(updateSpy).not.toBeCalled();
      expect(usersService.findById).toHaveBeenCalled();
    }
  });

  it('should throw error if user does not exists for product modification', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(null).toPromise());
    spyOn(productRepositoryService, 'findById').and.returnValue(
      of(productMock).toPromise(),
    );
    const validParam = { userId: 2, product: modifiedProductDTO };
    const updateSpy = jest
      .spyOn(productRepositoryService, 'update')
      .mockReturnValue(of(productMockModified).toPromise());

    try {
      await service.modifyProduct(validParam);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(updateSpy).not.toBeCalled();
      expect(usersService.findById).toHaveBeenCalled();
    }
  });

  it('should delete product successfully', async () => {
    const validParam: ProductDeletion = { userId: 1, productId: 1 };
    spyOn(usersService, 'findById').and.returnValue(of(userMock2).toPromise());
    const deleteSpy = jest
      .spyOn(productRepositoryService, 'delete')
      .mockReturnValue(of(null).toPromise());

    await service.deleteProduct(validParam);

    expect(deleteSpy).toBeCalled();
    expect(usersService.findById).toHaveBeenCalled();
  });

  it('should fail to  delete product due to unauthorized access', async () => {
    const validParam: ProductDeletion = { userId: 1, productId: 1 };
    const deleteSpy = jest.spyOn(productRepositoryService, 'delete');
    spyOn(usersService, 'findById').and.returnValue(of(null).toPromise());

    try {
      await service.deleteProduct(validParam);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(usersService.findById).toHaveBeenCalled();
      expect(deleteSpy).not.toBeCalled();
    }
  });
});
