import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO, UserLoginCredentials } from 'src/app.controller';
import { User } from './users/user';
import { UsersService } from './users/users.service';

export interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface DecodedToken {
  username: string;
  password: string;
  iat: number;
  exp: number;
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
    return user?.password === pass ? user : null;
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
    console.log(this.jwtService.decode(token));
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
  }

  public register(user: UserDTO): Promise<User> {
    return this.usersService.add(user);
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
