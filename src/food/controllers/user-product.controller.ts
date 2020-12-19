import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { of } from 'rxjs';
import {
  UserProductByDate,
  UserProductDeletion,
  UserProductDTO,
  UserProductModification,
} from '../models';

@Controller('userProduct')
export class UserProductController {
  public addUserProduct(userProduct: UserProductDTO): Promise<UserProductDTO> {
    return of(null).toPromise();
  }
  public modifyUserProduct(
    @Body(ValidationPipe)
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
  public deleteUserProduct(
    @Body(ValidationPipe) userProduct: UserProductDeletion,
  ): Promise<void> {
    return of(null).toPromise();
  }
}
