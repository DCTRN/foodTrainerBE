import { Test, TestingModule } from '@nestjs/testing';
import { UserProductController } from './user-product.controller';

describe('UserProduct Controller', () => {
  let controller: UserProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProductController],
    }).compile();

    controller = module.get<UserProductController>(UserProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
