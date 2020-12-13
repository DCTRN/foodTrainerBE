import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { UserProduct, UserProductDTO } from '../models';

@Injectable()
export class UserProductRepositoryService {
  public findUserProductByDate(
    start: Date,
    end?: Date,
  ): Promise<UserProduct[]> {
    return of(null).toPromise();
  }
  public add(userProduct: UserProductDTO): Promise<UserProduct> {
    return of(null).toPromise();
  }
  public update(userProduct: UserProduct): Promise<UserProduct> {
    return of(null).toPromise();
  }
  public delete(id: number): Promise<void> {
    return of(null).toPromise();
  }
}
