import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import {
  ProductDeletion,
  ProductDTO,
  ProductModification,
} from 'src/food/models';
import { ProductService } from '../services/product.service';

@Controller('product')
@UseGuards(JwtAccessAuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  public findProductBy(
    @Query('searchText') searchText: string,
    @Query('userId') userId: number,
  ): Promise<ProductDTO[]> {
    if (searchText) {
      return this.productService.findProductBy(searchText);
    } else {
      return this.productService.findProductsByUserId(userId);
    }
  }

  @Post('')
  public addProduct(
    @Body(ValidationPipe) product: ProductDTO,
  ): Promise<ProductDTO> {
    return this.productService.addProduct(product);
  }

  @Patch('')
  public modifyProduct(
    @Body(ValidationPipe) product: ProductModification,
  ): Promise<ProductDTO> {
    return this.productService.modifyProduct(product);
  }

  @Delete('')
  @HttpCode(204)
  public deleteProduct(
    @Body(ValidationPipe) product: ProductDeletion,
  ): Promise<void> {
    return this.productService.deleteProduct(product);
  }
}
