import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  addUserProductMock1,
  product1,
  user1,
  userProduct1,
  userProductDeletionMock1,
  userProductsByDateDTO1,
  userProductsByDateRangeDTO1,
} from '@tests/food/models';
import { UsersServiceMock } from '@tests/users/services';
import { of } from 'rxjs';
import { UsersService } from 'src/users/repositories/users.service';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Product, ProductDTO, UserProduct } from '../models';
import { ProductRepositoryService } from './product-repository.service';
import { UserProductRepositoryService } from './user-product-repository.service';

class UserProductRepositoryMock {
  public create(entityLike: DeepPartial<UserProduct>): UserProduct {
    return null;
  }
  public async save(entity: UserProduct): Promise<UserProduct> {
    return of(null).toPromise();
  }

  public async findOne(id: string): Promise<UserProduct> {
    return of(null).toPromise();
  }

  public async update(
    criteria: string,
    partialEntity: Partial<Product>,
  ): Promise<UpdateResult> {
    return of(null).toPromise();
  }

  public async find(
    options?: FindManyOptions<UserProduct>,
  ): Promise<Array<UserProduct>> {
    return of([null]).toPromise();
  }

  public async delete(id: number): Promise<DeleteResult> {
    return of(null).toPromise();
  }
}

export class ProductRepositoryServiceMock {
  public async findProductBy(searchText: string): Promise<Product[]> {
    return await of(null).toPromise();
  }

  public async findProductsByUserId(userId: number): Promise<Product[]> {
    return await of(null).toPromise();
  }

  public async findById(id: number): Promise<Product> {
    return await of(null).toPromise();
  }

  public async add(product: ProductDTO): Promise<Product> {
    return await of(null).toPromise();
  }

  public async update(product: ProductDTO): Promise<Product> {
    return await of(null).toPromise();
  }

  public async delete(id: number): Promise<void> {
    return await of(null).toPromise();
  }
}

describe('UserProductRepositoryService', () => {
  let service: UserProductRepositoryService;
  let userProductRepository: Repository<UserProduct>;
  let productRepositoryService: ProductRepositoryService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProductRepositoryService,
        {
          provide: getRepositoryToken(UserProduct),
          useClass: UserProductRepositoryMock,
        },
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
    userProductRepository = module.get<Repository<UserProduct>>(
      getRepositoryToken(UserProduct),
    );
    service = module.get<UserProductRepositoryService>(
      UserProductRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add userProduct', async () => {
    spyOn(usersService, 'findById').and.returnValues(of(user1).toPromise());
    spyOn(productRepositoryService, 'findById').and.returnValues(
      of(product1).toPromise(),
    );
    spyOn(userProductRepository, 'create').and.returnValues(
      of(userProduct1).toPromise(),
    );
    spyOn(userProductRepository, 'findOne').and.returnValues(
      of(userProduct1).toPromise(),
    );
    spyOn(userProductRepository, 'save');

    await service.add(addUserProductMock1);

    expect(usersService.findById).toHaveBeenCalled();
    expect(productRepositoryService.findById).toHaveBeenCalled();
    expect(userProductRepository.create).toHaveBeenCalled();
    expect(userProductRepository.save).toHaveBeenCalled();
  });

  it('should update userProduct', async () => {
    spyOn(userProductRepository, 'findOne').and.returnValues(
      of(userProduct1).toPromise(),
    );
    spyOn(userProductRepository, 'save');

    await service.update(addUserProductMock1);

    expect(userProductRepository.findOne).toHaveBeenCalledTimes(2);
    expect(userProductRepository.save).toHaveBeenCalled();
  });

  it('should delete userProduct', async () => {
    spyOn(userProductRepository, 'delete');

    await service.delete(userProductDeletionMock1.userProductId);

    expect(userProductRepository.delete).toHaveBeenCalled();
  });

  it('should find user products by given date', async () => {
    spyOn(userProductRepository, 'find');

    await service.findProductByDate(userProductsByDateDTO1);

    expect(userProductRepository.find).toHaveBeenCalled();
  });

  it('should find user products by given date range', async () => {
    spyOn(userProductRepository, 'find');

    await service.findProductByDateRange(userProductsByDateRangeDTO1);

    expect(userProductRepository.find).toHaveBeenCalled();
  });
});
