import { of } from 'rxjs';
import { UserDTO } from 'src/users/models/user/user-dto.model';
import { User } from 'src/users/models/user/user.model';
import { DeleteResult } from 'typeorm';

export class UsersServiceMock {
  public async add(user: UserDTO): Promise<User> {
    return of(null).toPromise();
  }

  public async update(id: number, user: Partial<User>): Promise<User> {
    return of(null).toPromise();
  }

  public async findById(id: number): Promise<User> {
    return of(null).toPromise();
  }

  public async findByUsername(username: string): Promise<User> {
    return of(null).toPromise();
  }

  public async findBySimilarToUsername(username: string): Promise<Array<User>> {
    return of(null).toPromise();
  }

  public async findAll(): Promise<Array<User>> {
    return of(null).toPromise();
  }

  public delete(id: number): Promise<DeleteResult> {
    return of(null).toPromise();
  }
}
