import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { DbConstraintExceptionsFilter } from 'src/core/filters/db-constraint-exceptions.filter';
import { UserDTO } from 'src/users/models/user-dto.model';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/repositories/users.service';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Tokens } from './models/tokens.model';

const tokensMock: Tokens = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hamtlbDEyMyIsInBhc3N3b3JkIjoiaGFzbG8xMjMiLCJpYXQiOjE1OTcwMDU5MzIsImV4cCI6MTU5NzAwNjIzMn0.fJbkOTpY5_6UINuLJzNfNxM8STQMcK074cd0AfmUyiQ',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hamtlbDEyMyIsInBhc3N3b3JkIjoiaGFzbG8xMjMiLCJpYXQiOjE1OTcwMDU5MzIsImV4cCI6MTU5OTU5NzkzMn0.kkt1uIMbOipGLjOLae5PeP9X_zjP4AkAKpvHt6G3XDI',
  expires_in: 300,
};

const userCredentialsMock = { username: 'username', password: 'password' };

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

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, JwtModule.register({})],
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: APP_FILTER,
          useClass: DbConstraintExceptionsFilter,
        },
        UsersService,
        AuthService,
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should log in', async () => {
    const logingSpy = jest
      .spyOn(authService, 'login')
      .mockReturnValue(tokensMock);

    await controller.login(userCredentialsMock);

    expect(logingSpy).toHaveBeenCalled();
  });

  it('should refresh token', async () => {
    const registerSpy = jest
      .spyOn(authService, 'register')
      .mockReturnValue(of(userMock).toPromise());

    await controller.register(userDTOMock);

    expect(registerSpy).toHaveBeenCalled();
  });

  it('should refresh token', async () => {
    const refresh = jest
      .spyOn(authService, 'refresh')
      .mockReturnValue(tokensMock);

    await controller.refresh({
      refresh_token: tokensMock.refresh_token,
    });

    expect(refresh).toHaveBeenCalled();
  });
});
