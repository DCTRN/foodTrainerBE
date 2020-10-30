import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { of } from 'rxjs';
import { UserDTO } from 'src/users/models/user/user-dto.model';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/repositories/users.service';
import { DeleteResult, Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { DecodedToken } from './models/decoded-token.model';
import { Tokens } from './models/tokens.model';

const userMock: User = {
  id: 1,
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hashPassword(): void {},
  userFriends1: null,
  userFriends2: null,
};

const userDTOMock: UserDTO = {
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
};

const deleteMock: DeleteResult = {
  raw: null,
};

const successfulLoginMock: Tokens = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hamtlbDEyMyIsInBhc3N3b3JkIjoiaGFzbG8xMjMiLCJpYXQiOjE1OTcwMDU5MzIsImV4cCI6MTU5NzAwNjIzMn0.fJbkOTpY5_6UINuLJzNfNxM8STQMcK074cd0AfmUyiQ',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hamtlbDEyMyIsInBhc3N3b3JkIjoiaGFzbG8xMjMiLCJpYXQiOjE1OTcwMDU5MzIsImV4cCI6MTU5OTU5NzkzMn0.kkt1uIMbOipGLjOLae5PeP9X_zjP4AkAKpvHt6G3XDI',
  expires_in: 300,
};

const decodedTokenMock: DecodedToken = {
  username: 'majkel123',
  password: 'haslo123',
  iat: 1597085433,
  exp: 1599677433,
};

@Injectable()
export class UsersServiceMock {
  private userMock: User;
  public setReturnedValue(returnedValue: User): void {
    this.userMock = returnedValue;
  }
  public async add(user: UserDTO): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async update(id: number, user: Partial<User>): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async findById(id: number): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async findByUsername(username: string): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async findAll(): Promise<Array<User>> {
    return of([this.userMock]).toPromise();
  }

  public delete(id: number): Promise<DeleteResult> {
    return of(deleteMock).toPromise();
  }
}

@Injectable()
export class JwtServiceMock {
  private token: string;

  public setReturnTokenValue(token: string): void {
    this.token = token;
  }

  public sign(
    payload: string | Buffer | object,
    options?: JwtSignOptions,
  ): string {
    return this.token;
  }

  public decode(
    token: string,
  ):
    | null
    | {
        [key: string]: any;
      }
    | string {
    return null;
  }
}

const userFromDbMock: User = {
  id: 1,
  username: 'username',
  password: bcrypt.hashSync('password', 10),
  email: 'email',
  birthDate: new Date(),
  accountCreationDate: new Date(),
  phoneNumber: '111222333',
  firstName: 'firstName',
  lastName: 'lastName',
  authenticationLevel: 1,
  hashPassword: jest.fn(),
  isActive: true,
  userFriends1: null,
  userFriends2: null,
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user', async () => {
    const findByUsernameSpy = jest
      .spyOn(usersService, 'findByUsername')
      .mockImplementation(
        () => new Promise(resolve => resolve(userFromDbMock)),
      );

    ((usersService as unknown) as UsersServiceMock).setReturnedValue(null);
    const errorResult = await service.validateUser(
      'badUsername',
      'badPassword',
    );
    expect(findByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(errorResult).toBeFalsy();

    ((usersService as unknown) as UsersServiceMock).setReturnedValue(
      userFromDbMock,
    );
    const successResult = await service.validateUser(
      userFromDbMock.username,
      'password',
    );
    expect(findByUsernameSpy).toHaveBeenCalledTimes(2);
    expect(successResult).toBeTruthy();
  });

  it('should log in', async () => {
    const signSpy = jest.spyOn(jwtService, 'sign');

    ((jwtService as unknown) as JwtServiceMock).setReturnTokenValue(
      successfulLoginMock.access_token,
    );
    const loginReslut = await service.login({
      username: userMock.username,
      password: userMock.password,
    });
    expect(signSpy).toHaveBeenCalledTimes(2);
    expect(loginReslut.access_token).toEqual(successfulLoginMock.access_token);
    expect(loginReslut.refresh_token).toEqual(successfulLoginMock.access_token);
    expect(loginReslut.expires_in).toEqual(300);
  });

  it('should refresh token', async () => {
    jest.spyOn(jwtService, 'decode').mockReturnValue(decodedTokenMock);

    ((jwtService as unknown) as JwtServiceMock).setReturnTokenValue(
      successfulLoginMock.access_token,
    );
    const refreshResult = await service.refresh(
      successfulLoginMock.refresh_token,
    );

    expect(refreshResult.access_token).toBeTruthy();
    expect(refreshResult.refresh_token).toBeTruthy();
    expect(refreshResult.expires_in).toEqual(300);
  });

  it('should register', async () => {
    const addSpy = jest.spyOn(usersService, 'add').mockImplementation(
      () =>
        new Promise(resolve => {
          resolve(userFromDbMock);
        }),
    );

    await service.register(userDTOMock);

    expect(addSpy).toHaveBeenCalled();
  });
});
