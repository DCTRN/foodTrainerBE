import { of } from 'rxjs';
import {
  UserProductByDate,
  UserProductDeletion,
  UserProductDTO,
  UserProductModification,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
} from 'src/food/models';

export class UserProductServiceMock {
  public addUserProduct(userProduct: UserProductDTO): Promise<UserProductDTO> {
    return of(null).toPromise();
  }
  public modifyUserProduct(
    userProduct: UserProductModification,
  ): Promise<UserProductDTO> {
    return of(null).toPromise();
  }
  public findProductByDate(
    date: UserProductsByDateDTO,
  ): Promise<UserProductDTO[]> {
    return of(null).toPromise();
  }
  public findProductByDateRange(
    date: UserProductsByDateRangeDTO,
  ): Promise<UserProductDTO[]> {
    return of(null).toPromise();
  }
  public deleteUserProduct(userProduct: UserProductDeletion): Promise<void> {
    return of(null).toPromise();
  }
}
