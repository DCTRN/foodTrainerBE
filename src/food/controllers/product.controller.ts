import { Controller, UseGuards } from '@nestjs/common';
import { of } from 'rxjs';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import {
  ProductDeletion,
  ProductDTO,
  ProductModification,
} from 'src/food/models';

@Controller('product')
@UseGuards(JwtAccessAuthGuard)
export class ProductController {
  public findProductBy(searchText: string): Promise<ProductDTO[]> {
    return of(null).toPromise();
  }
  public addProduct(product: ProductDTO): Promise<ProductDTO> {
    return of(null).toPromise();
  }

  // might be done later
  public modifyProduct(product: ProductModification): Promise<ProductDTO> {
    return of(null).toPromise();
  }
  public deleteProduct(product: ProductDeletion): Promise<void> {
    return of(null).toPromise();
  }
}
