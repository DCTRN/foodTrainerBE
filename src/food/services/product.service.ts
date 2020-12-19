import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/repositories/users.service';
import { ProductDeletion, ProductDTO, ProductModification } from '../models';
import { ProductRepositoryService } from '../repositories/product-repository.service';
import { ProductToDTOConverter } from '../utils/product-to-dto-converter';

@Injectable()
export class ProductService {
  private readonly productDTOConverter: ProductToDTOConverter = new ProductToDTOConverter();
  private readonly missingValueText = 'Missing value';
  private readonly idKey = 'id';

  constructor(
    private productRepositoryService: ProductRepositoryService,
    private usersService: UsersService,
  ) {}

  public async findProductBy(searchText: string): Promise<ProductDTO[]> {
    this.throwErrorIfValueIsFalsy(searchText);
    const productFromDB = await this.productRepositoryService.findProductBy(
      searchText,
    );
    return this.productDTOConverter.convertProducts(productFromDB);
  }

  public async findProductsByUserId(userId: number): Promise<ProductDTO[]> {
    this.throwErrorForNaN(userId);
    this.throwErrorIfValueIsFalsy(userId);
    const productFromDB = await this.productRepositoryService.findProductsByUserId(
      userId,
    );
    return this.productDTOConverter.convertProducts(productFromDB);
  }

  public async addProduct(product: ProductDTO): Promise<ProductDTO> {
    const productFromDB = await this.productRepositoryService.add(product);
    return this.productDTOConverter.convertProduct(productFromDB);
  }

  public async modifyProduct(
    product: ProductModification,
  ): Promise<ProductDTO> {
    const productId = product.product.id;
    if (!productId) {
      throw new Error('Id parameter is missing');
    }
    if (!(await this.productRepositoryService.findById(productId))) {
      throw new Error('Product with such id does not exists');
    }
    // TODO test errors^^
    await this.throwErrorIfUserDoesNotExists(product.userId);
    this.throwErrorForUnauthorizedModification(product);
    const productFromDb = await this.productRepositoryService.update(
      product.product,
    );
    return this.productDTOConverter.convertProduct(productFromDb);
  }

  public async deleteProduct(product: ProductDeletion): Promise<void> {
    await this.throwErrorIfUserDoesNotExists(product.userId);
    return await this.productRepositoryService.delete(product.productId);
  }

  private throwErrorForNaN(userId: number): void {
    if (isNaN(userId)) {
      throw new Error('Invalid paremeter');
    }
  }

  private async throwErrorIfUserDoesNotExists(id: number): Promise<void> {
    const u = await this.usersService.findById(id);
    if (u) {
      return;
    }
    throw new Error('Unauthorized action');
  }

  private throwErrorIfValueIsFalsy<T>(value: T): void {
    if (value) {
      return;
    }
    throw new Error(this.missingValueText);
  }

  private throwErrorForUnauthorizedModification(
    product: ProductModification,
  ): void {
    if (product.userId === product.product.creatorId) {
      return;
    }
    throw new Error('Only product author can modify product');
  }
}
