import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  HttpException,
  Catch,
  UseFilters,
} from '@nestjs/common';
import { UserDTO } from './users/models/UserDTO.model';
import { AuthService, UserWithoutSensitiveData } from './auth.service';
import { Tokens } from './models/Tokens.model';
import { User } from './users/models/user.model';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guards';
import { UserLoginCredentials } from './users/models/UserLoginCredentials.model';

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
  public async register(
    @Body(ValidationPipe) user: UserDTO,
  ): Promise<UserWithoutSensitiveData> {
    return this.authService.register(user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  public refresh(@Body() token: RefreshToken): Tokens {
    return this.authService.refresh(token.refresh_token);
  }
}
