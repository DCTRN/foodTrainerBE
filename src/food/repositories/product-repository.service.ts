import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/repositories/users.service';
import { Like, Repository } from 'typeorm';
import { Product, ProductDTO } from '../models';

@Injectable()
export class ProductRepositoryService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private usersService: UsersService,
  ) { }

  public async findProductBy(searchText: string): Promise<Product[]> {
    const names = await this.findNamesBy(searchText);
    const producers = await this.findProducersBy(searchText);
    return this.removeDuplicates(names, producers);
  }

  public async findProductsByUserId(userId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        creator: userId,
      },
    });
  }

  public async add(product: ProductDTO): Promise<Product> {
    try {
      const user = await this.usersService.findById(product.creatorId);
      const partialProduct: Partial<Product> = { ...product };
      partialProduct.creator = user;
      const productCreatedByDb = this.productRepository.create(partialProduct);
      const p = await this.productRepository.save(productCreatedByDb);
      return await this.productRepository.findOne(p.id);
    } catch (error) {
      console.warn(error)
    }
  }

  public async update(product: ProductDTO): Promise<Product> {
    const entity = await this.updateProductEntity(product);
    return await this.productRepository.save(entity);
  }

  public async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
    return;
  }

  public async findById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  private async updateProductEntity(product: ProductDTO): Promise<Product> {
    const p = await this.productRepository.findOne(product.id);
    const keys = Object.keys(product);
    for (const key of keys) {
      p[key] = product[key];
    }
    return p;
  }

  private removeDuplicates(names: Product[], producers: Product[]): Product[] {
    return names
      ?.concat(producers)
      .filter(
        (product, i, self) => self.findIndex(p => p.id === product.id) === i,
      );
  }

  private async findNamesBy(searchText: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        name: Like(`%${searchText}%`),
      },
    });
  }

  private async findProducersBy(searchText: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        producer: Like(`%${searchText}%`),
      },
    });
  }
}
