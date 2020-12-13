import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { Product } from '../models';

@Injectable()
export class ProductRepositoryService {
  public findProductBy(searchText: string): Promise<Product[]> {
    return of(null).toPromise();
  }
  public add(product: Product): Promise<Product> {
    return of(null).toPromise();
  }
  public update(product: Product): Promise<Product> {
    return of(null).toPromise();
  }
  public delete(id: number): Promise<void> {
    return of(null).toPromise();
  }
}
