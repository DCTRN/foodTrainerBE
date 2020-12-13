import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { ProductDeletion, ProductDTO, ProductModification } from '../models';

@Injectable()
export class ProductService {
  public findProductBy(searchText: string): Promise<ProductDTO[]> {
    return of(null).toPromise();
  }
  public addProduct(product: ProductDTO): Promise<ProductDTO> {
    return of(null).toPromise();
  }
  public modifyProduct(product: ProductModification): Promise<ProductDTO> {
    return of(null).toPromise();
  }
  public deleteProduct(product: ProductDeletion): Promise<void> {
    return of(null).toPromise();
  }
}
