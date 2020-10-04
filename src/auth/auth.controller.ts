import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { DbConstraintExceptionsFilter } from 'src/core/filters/db-constraint-exceptions.filter';
import { UnauthorizedFilter } from 'src/core/filters/unauthorized.filter';
import { AuthService, UserWithoutSensitiveData } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guards';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Tokens } from './models/tokens.model';
import { UserDTO } from './users/models/UserDTO.model';
import { UserLoginCredentials } from './users/models/UserLoginCredentials.model';

interface RefreshToken {
  refresh_token: string;
}

@Controller('auth')
@UseFilters(DbConstraintExceptionsFilter, UnauthorizedFilter)
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
