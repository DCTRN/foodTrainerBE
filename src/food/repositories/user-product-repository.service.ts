import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/repositories/users.service';
import { Between, Repository } from 'typeorm';
import {
  UserProduct,
  UserProductDTO,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
} from '../models';
import { ProductRepositoryService } from './product-repository.service';
import { getManager } from 'typeorm';

@Injectable()
export class UserProductRepositoryService {
  private readonly startHour = '00:00:00.000';
  private readonly endHour = '23:59:59.999';

  private readonly monthsNumToAbbr: Record<string, string> = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  constructor(
    @InjectRepository(UserProduct)
    private userProductRepository: Repository<UserProduct>,
    private productRepositoryService: ProductRepositoryService,
    private usersService: UsersService,
  ) { }

  public async findProductByDate(
    date: UserProductsByDateDTO,
  ): Promise<UserProduct[]> {
    const baseDate: string = new Date(date.date).toISOString().split('T')[0];
    const [year, month, day] = baseDate.split('-');
    const oracleDate = `${day}-${this.monthsNumToAbbr[month]}-${year}`

    return await this.userProductRepository.find({
      where: {
        user: date.userId,
        date: oracleDate
      },
    });
  }

  public async findProductByDateRange(
    date: UserProductsByDateRangeDTO,
  ): Promise<UserProduct[]> {
    const start = date.start.toString().split('T')[0];
    const end = date.end.toString().split('T')[0];
    const startDate = `${start} ${this.startHour}`;
    const endDate = `${end} ${this.endHour}`;
    return await this.userProductRepository.find({
      where: {
        user: date.userId,
        date: Between(startDate, endDate),
      },
    });
  }

  public async add(userProduct: UserProductDTO): Promise<UserProduct> {
    try {
      console.warn('add product date');
      console.warn(new Date(userProduct.date).toISOString().split('T')[0].replace(new RegExp("-", 'g'), "/") as unknown as Date);
      const product = await this.productRepositoryService.findById(
        userProduct.productId,
      );
      const user = await this.usersService.findById(userProduct.userId);
      const userProductTemp: Partial<UserProduct> = {
        ...userProduct,
        user,
        product,
        date: new Date(userProduct.date).toISOString().split('T')[0] as unknown as Date
      };
      // date: new Date(userProduct.date).toISOString().split('T')[0] as unknown as Date
      // '22/Jan/23'
      const userProductFromDb = this.userProductRepository.create(
        userProductTemp,
      );
      return await this.userProductRepository.save(userProductFromDb);
    } catch (error) {
      console.warn(error);
    }
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
