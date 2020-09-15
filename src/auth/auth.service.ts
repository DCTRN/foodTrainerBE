import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/auth/users/models/UserDTO.model';
import { User } from './users/models/user.model';
import { UsersService } from './users/users.service';
import { UserLoginCredentials } from './users/models/UserLoginCredentials.model';
import * as bcrypt from 'bcrypt';
import { DecodedToken } from './models/DecodedToken.model';
import { Tokens } from './models/Tokens.model';

export interface UserWithoutSensitiveData {
  id: number;
  username: string;
  email: string;
  birthDate: Date;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  authenticationLevel: number;
}

@Injectable()
export class AuthService {
  private readonly expiresInTime = 300;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return;
    }
    const arePasswordEqual = await bcrypt.compare(pass, user.password);
    return arePasswordEqual ? user : null;
  }

  public login(user: UserLoginCredentials): Tokens {
    const { username, password } = user;
    const payload = { username, password };
    const access_token = this.generateAccessToken(payload);
    const refresh_token = this.generateRefreshToken(payload);
    const expires_in = this.expiresInTime;
    return {
      access_token,
      refresh_token,
      expires_in,
    };
  }

  public refresh(token: string): Tokens {
    const decodedToken = this.jwtService.decode(token) as DecodedToken;
    const payload = {
      username: decodedToken.username,
      password: decodedToken.password,
    };
    const access_token = this.generateAccessToken(payload);
    const shouldNotCreateNewRefreshToken =
      Math.floor(decodedToken.exp - new Date().getTime() / 1000) >
      (this.expiresInTime / 100) * 1.05;
    const refresh_token = shouldNotCreateNewRefreshToken
      ? token
      : this.generateRefreshToken(payload);
    const expires_in = this.expiresInTime;
    return {
      access_token,
      refresh_token,
      expires_in,
    };
    return null;
  }

  public async register(user: UserDTO): Promise<UserWithoutSensitiveData> {
    const u = await this.usersService.add(user);
    const userWithoutSensitiveData: UserWithoutSensitiveData = {
      id: u.id,
      username: u.username,
      email: u.email,
      birthDate: u.birthDate,
      phoneNumber: u.phoneNumber,
      firstName: u.firstName,
      lastName: u.lastName,
      authenticationLevel: u.authenticationLevel,
    };
    return userWithoutSensitiveData;
  }

  private generateRefreshToken(payload: UserLoginCredentials) {
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_KEY,
      expiresIn: '30d',
    });
  }

  private generateAccessToken(payload: UserLoginCredentials) {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_KEY,
      expiresIn: '5m',
    });
  }
}
