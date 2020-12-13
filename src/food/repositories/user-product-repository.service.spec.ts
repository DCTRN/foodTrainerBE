import { Test, TestingModule } from '@nestjs/testing';
import { UserProductRepositoryService } from './user-product-repository.service';

describe('UserProductRepositoryService', () => {
  let service: UserProductRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProductRepositoryService],
    }).compile();

    service = module.get<UserProductRepositoryService>(UserProductRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
