import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDataConverter } from 'src/core/utils/user-data-converter';
import { UserDTO } from 'src/users/models/user/user-dto.model';
import { UserLoginCredentials } from 'src/users/models/user/user-login-credentials.model';
import { UserWithoutSensitiveData } from 'src/users/models/user/user-without-sensitive-data';
import { User } from 'src/users/models/user/user.model';
import { UsersService } from 'src/users/repositories/users.service';
import { DecodedToken } from './models/decoded-token.model';
import { Tokens } from './models/tokens.model';

@Injectable()
export class AuthService {
  private userDataConverter = new UserDataConverter();
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
  }

  public async register(user: UserDTO): Promise<UserWithoutSensitiveData> {
    const u = await this.usersService.add(user);
    // TODO test with additional fields
    return this.userDataConverter.trimUserSensitiveData(u);
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
