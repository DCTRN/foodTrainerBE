import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO, UserLoginCredentials } from '../app.controller';
import { AuthService, Tokens } from './auth.service';
import { User } from './users/user';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guards';

interface RefreshToken {
  refresh_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Body(ValidationPipe) user: UserLoginCredentials): Tokens {
    return this.authService.login(user);
  }

  @Post('register')
  public async register(@Body(ValidationPipe) user: UserDTO): Promise<User> {
    return this.authService.register(user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  public refresh(@Body() token: RefreshToken): Tokens {
    return this.authService.refresh(token.refresh_token);
  }
}
