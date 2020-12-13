import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import {
  UserProductByDate,
  UserProductDeletion,
  UserProductDTO,
  UserProductModification,
} from '../models';

@Injectable()
export class UserProductService {
  public addUserProduct(userProduct: UserProductDTO): Promise<UserProductDTO> {
    return of(null).toPromise();
  }
  public modifyUserProduct(
    userProduct: UserProductModification,
  ): Promise<UserProductDTO> {
    return of(null).toPromise();
  }
  public findProductByDate(date?: Date): Promise<UserProductDTO[]> {
    return of(null).toPromise();
  }
  public findProductByDateRange(
    start: Date,
    end?: Date,
  ): Promise<UserProductByDate[]> {
    return of(null).toPromise();
  }
  public deleteUserProduct(userProduct: UserProductDeletion): Promise<void> {
    return of(null).toPromise();
  }
}
