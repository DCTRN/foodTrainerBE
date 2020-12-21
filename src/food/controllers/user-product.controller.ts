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
  UserProductByDate,
  UserProductDeletion,
  UserProductDTO,
  UserProductModification,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
} from '../models';
import { UserProductService } from '../services/user-product.service';

@Controller('userProduct')
// @UseGuards(JwtAccessAuthGuard)
export class UserProductController {
  constructor(private userProductService: UserProductService) {}

  @Get('findByDate')
  public async findProductByDate(
    @Body(ValidationPipe)
    date: UserProductsByDateDTO,
  ): Promise<UserProductDTO[]> {
    return await this.userProductService.findProductByDate(date);
  }

  @Get('findByDateRange')
  public async findProductByDateRange(
    @Body(ValidationPipe)
    date: UserProductsByDateRangeDTO,
  ): Promise<UserProductDTO[]> {
    return await this.userProductService.findProductByDateRange(date);
  }

  @Post('')
  public async addUserProduct(
    @Body(ValidationPipe)
    userProduct: UserProductDTO,
  ): Promise<UserProductDTO> {
    console.log('addUserProduct', userProduct);
    return await this.userProductService.addUserProduct(userProduct);
  }

  @Patch('')
  public async modifyUserProduct(
    @Body(ValidationPipe)
    userProduct: UserProductModification,
  ): Promise<UserProductDTO> {
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
