import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { UsersService } from 'src/users/repositories/users.service';
import { Between, Repository } from 'typeorm';
import {
  UserProduct,
  UserProductDTO,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
} from '../models';
import { ProductRepositoryService } from './product-repository.service';

@Injectable()
export class UserProductRepositoryService {
  constructor(
    @InjectRepository(UserProduct)
    private userProductRepository: Repository<UserProduct>,
    private productRepositoryService: ProductRepositoryService,
    private usersService: UsersService,
  ) {}

  public async findProductByDate(
    date: UserProductsByDateDTO,
  ): Promise<UserProduct[]> {
    const start = '00:00:00.000';
    const end = '23:59:59.999';
    const baseDate = date.date.toString().split('T')[0];
    const startDate = `${baseDate} ${start}`;
    const endDate = `${baseDate} ${end}`;
    return await this.userProductRepository.find({
      where: {
        user: date.userId,
        date: Between(startDate, endDate),
      },
    });
  }

  public findProductByDateRange(
    date: UserProductsByDateRangeDTO,
  ): Promise<UserProduct[]> {
    return of(null).toPromise();
  }

  public async add(userProduct: UserProductDTO): Promise<UserProduct> {
    const product = await this.productRepositoryService.findById(
      userProduct.id,
    );
    const user = await this.usersService.findById(userProduct.userId);
    const userProductTemp: Partial<UserProduct> = {
      ...userProduct,
      user,
      product,
    };
    const userProductFromDb = this.userProductRepository.create(
      userProductTemp,
    );
    return this.userProductRepository.save(userProductFromDb);
  }

  public async update(userProduct: UserProductDTO): Promise<UserProduct> {
    const entity = await this.updateProductEntity(userProduct);
    await this.userProductRepository.save(entity);
    return await this.userProductRepository.findOne(userProduct.id);
  }

  public async delete(id: number): Promise<void> {
    await this.userProductRepository.delete(id);
    return;
  }

  private async updateProductEntity(
    userProduct: UserProductDTO,
  ): Promise<UserProduct> {
    const p = await this.userProductRepository.findOne(userProduct.id);
    const keys = Object.keys(userProduct);
    for (const key of keys) {
      p[key] = userProduct[key];
    }
    return p;
  }
}
