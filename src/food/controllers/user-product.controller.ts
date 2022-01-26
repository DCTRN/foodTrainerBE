import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import {
  UserProductDeletion,
  UserProductDTO,
  UserProductModification,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
  UserProductWithProductDTO,
} from '../models';
import { UserProductService } from '../services/user-product.service';

@Controller('userProduct')
// @UseGuards(JwtAccessAuthGuard)
export class UserProductController {
  constructor(private userProductService: UserProductService) { }

  @Post('findByDate')
  public async findProductByDate(
    @Body(ValidationPipe)
    date: UserProductsByDateDTO,
  ): Promise<UserProductWithProductDTO[]> {
    console.warn('findProductByDate');
    console.warn(date);
    const result = await this.userProductService.findProductByDate(date);
    console.warn("findProductByDate result");
    console.warn(result);
    return result;
  }

  @Post('findByDateRange')
  public async findProductByDateRange(
    @Body(ValidationPipe)
    date: UserProductsByDateRangeDTO,
  ): Promise<UserProductWithProductDTO[]> {
    return await this.userProductService.findProductByDateRange(date);
  }

  @Post('')
  public async addUserProduct(
    @Body(ValidationPipe)
    userProduct: UserProductDTO,
  ): Promise<UserProductWithProductDTO> {
    console.warn('addUserProduct req');
    console.warn(userProduct);
    const result = await this.userProductService.addUserProduct(userProduct);
    console.warn('addUserProduct result');
    console.warn(result);
    return result;
  }

  @Patch('')
  public async modifyUserProduct(
    @Body(ValidationPipe)
    userProduct: UserProductModification,
  ): Promise<UserProductWithProductDTO> {
    return await this.userProductService.modifyUserProduct(userProduct);
  }

  @Delete('')
  @HttpCode(204)
  public async deleteUserProduct(
    @Body(ValidationPipe) userProduct: UserProductDeletion,
  ): Promise<void> {
    return await this.userProductService.deleteUserProduct(userProduct);
  }
}
