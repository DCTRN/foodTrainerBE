/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersServiceMock } from '@tests/users/services';
import { of } from 'rxjs';
import { User } from 'src/users/models/user/user.model';
import { UsersService } from 'src/users/repositories/users.service';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Product, ProductDTO } from '../models';
import { ProductRepositoryService } from './product-repository.service';

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

const updateResultMock: UpdateResult = {
  raw: null,
  generatedMaps: [],
};

const deleteMock: DeleteResult = {
  raw: null,
};

class ProductRepositoryMock {
  public create(entityLike: DeepPartial<Product>): Product {
    return null;
  }
  public async save(entity: Product): Promise<Product> {
    return of(null).toPromise();
  }

  public async findOne(id: string): Promise<Product> {
    return of(null).toPromise();
  }

  public async update(
    criteria: string,
    partialEntity: Partial<Product>,
  ): Promise<UpdateResult> {
    return of(updateResultMock).toPromise();
  }

  public async find(
    options?: FindManyOptions<Product>,
  ): Promise<Array<Product>> {
    return of([null]).toPromise();
  }

  public async delete(id: number): Promise<DeleteResult> {
    return of(deleteMock).toPromise();
  }
}

describe('ProductRepositoryService', () => {
  let service: ProductRepositoryService;
  let repository: Repository<Product>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepositoryService,
        {
          provide: getRepositoryToken(Product),
          useClass: ProductRepositoryMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
    service = module.get<ProductRepositoryService>(ProductRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find product by searchText', async () => {
    spyOn(repository, 'find').and.returnValue(of([productMock]).toPromise());

    await service.findProductBy('searchText');

    expect(repository.find).toHaveBeenCalled();
  });

  it('should find products by userId', async () => {
    spyOn(repository, 'find').and.returnValue(of([productMock]).toPromise());

    await service.findProductsByUserId(productMock.creator.id);

    expect(repository.find).toHaveBeenCalled();
  });

  it('should find product by product id', async () => {
    spyOn(repository, 'findOne').and.returnValue(of(productMock).toPromise());

    await service.findById(productMock.id);

    expect(repository.findOne).toHaveBeenCalled();
  });

  it('should add new product', async () => {
    spyOn(usersService, 'findById').and.returnValue(of(userMock1).toPromise());
    spyOn(repository, 'create');
    spyOn(repository, 'save').and.returnValue(of(productMock).toPromise());
    spyOn(repository, 'findOne').and.returnValue(of(productMock).toPromise());

    await service.add(validProductDTOMock);

    expect(repository.create).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
    expect(repository.findOne).toHaveBeenCalledWith(productMock.creator.id);
    expect(usersService.findById).toHaveBeenCalled();
  });

  it('should update product', async () => {
    spyOn(repository, 'findOne').and.returnValue(of(productMock).toPromise());
    spyOn(repository, 'save').and.returnValue(of(productMock).toPromise());

    await service.update(validProductDTOMock);

    expect(repository.findOne).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete product', async () => {
    spyOn(repository, 'delete').and.returnValue(of(null).toPromise());

    await service.delete(productMock.id);

    expect(repository.delete).toHaveBeenCalled();
  });
});
