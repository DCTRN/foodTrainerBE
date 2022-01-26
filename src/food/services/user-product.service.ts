import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/repositories/users.service';
import {
  UserProduct,
  UserProductDeletion,
  UserProductDTO,
  UserProductModification,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
  UserProductWithProductDTO,
} from '../models';
import { UserProductRepositoryService } from '../repositories/user-product-repository.service';
import { ProductToDTOConverter } from '../utils/product-to-dto-converter';

@Injectable()
export class UserProductService {
  private readonly productDTOConverter: ProductToDTOConverter = new ProductToDTOConverter();

  constructor(
    private userProductRepositoryService: UserProductRepositoryService,
    private usersService: UsersService,
  ) { }

  public async addUserProduct(
    userProduct: UserProductDTO,
  ): Promise<UserProductWithProductDTO> {
    await this.throwErrorIfGivenUserDoesNotExists(userProduct.userId);
    const userProductFromDB = await this.userProductRepositoryService.add(
      userProduct,
    );
    console.warn('userProductFromDB');
    console.warn(userProductFromDB);
    const result = this.createUserProductDTO(userProductFromDB);
    return result;
  }

  public async modifyUserProduct(
    userProduct: UserProductModification,
  ): Promise<UserProductWithProductDTO> {
    this.throwErrorIfUserIdsDoesNotMatch(userProduct);
    await this.throwErrorIfGivenUserDoesNotExists(userProduct.userId);
    // TODO should throw error when given userProduct does not exists
    const userProductFromDB = await this.userProductRepositoryService.update(
      userProduct.product,
    );
    return this.createUserProductDTO(userProductFromDB);
  }

  public async findProductByDate(
    date: UserProductsByDateDTO,
  ): Promise<UserProductWithProductDTO[]> {
    await this.throwErrorIfGivenUserDoesNotExists(date.userId);
    const userProducts = await this.userProductRepositoryService.findProductByDate(
      date,
    );
    return this.createUserProductsDTO(userProducts);
  }

  public async findProductByDateRange(
    date: UserProductsByDateRangeDTO,
  ): Promise<UserProductWithProductDTO[]> {
    await this.throwErrorIfGivenUserDoesNotExists(date.userId);
    const userProducts = await this.userProductRepositoryService.findProductByDateRange(
      date,
    );
    return this.createUserProductsDTO(userProducts);
  }

  public async deleteUserProduct(
    userProduct: UserProductDeletion,
  ): Promise<void> {
    await this.throwErrorIfGivenUserDoesNotExists(userProduct.userId);
    return this.userProductRepositoryService.delete(userProduct.userProductId);
  }

  private throwErrorIfUserIdsDoesNotMatch(
    userProduct: UserProductModification,
  ): void {
    if (userProduct.userId !== userProduct.product.userId) {
      throw new Error('Invalid request. ID doest not match.');
    }
  }

  private createUserProductsDTO(
    userProducts: UserProduct[],
  ): UserProductWithProductDTO[] {
    return userProducts?.map(userProduct =>
      this.createUserProductDTO(userProduct),
    );
  }

  private createUserProductDTO(
    userProductFromDB: UserProduct,
  ): UserProductWithProductDTO {
    return {
      id: userProductFromDB.id,
      product: this.productDTOConverter.convertProduct(
        userProductFromDB.product,
      ),
      amount: userProductFromDB.amount,
      date: userProductFromDB.date,
      mealTimeType: userProductFromDB.mealTimeType,
      userId: userProductFromDB.user.id,
    };
  }

  private async throwErrorIfGivenUserDoesNotExists(id: number): Promise<void> {
    const user = await this.usersService.findById(id);
    if (user) {
      return;
    }
    throw new Error('Unauthrized operation. User does not exists.');
  }
}
