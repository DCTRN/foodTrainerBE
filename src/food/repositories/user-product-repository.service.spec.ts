import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
});
