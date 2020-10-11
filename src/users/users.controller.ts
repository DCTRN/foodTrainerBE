import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import { DbConstraintExceptionsFilter } from 'src/core/filters/db-constraint-exceptions.filter';
import { UnauthorizedFilter } from 'src/core/filters/unauthorized.filter';
import { UserDataConverter } from 'src/core/utils/user-data-converter';
import { UserDTO } from './models/user-dto.model';
import { UserWithoutSensitiveData } from './models/user-without-sensitive-data';
import { UsersService } from './repositories/users.service';

@Controller('users')
@UseGuards(JwtAccessAuthGuard)
@UseFilters(DbConstraintExceptionsFilter, UnauthorizedFilter)
export class UsersController {
  private userDataConverter = new UserDataConverter();
  constructor(private usersService: UsersService) {}
  @Get('')
  public async getUserCredentials(
    @Query('username') username: string,
  ): Promise<UserWithoutSensitiveData> {
    if (!username) {
      return;
    }
    const user = await this.usersService.findByUsername(username);
    return this.userDataConverter.trimUserSensitiveData(user);
  }

  @Patch(':id')
  public async updateUserCredentials(
    @Param('id') id: number,
    @Body(ValidationPipe) user: UserDTO,
  ): Promise<UserWithoutSensitiveData> {
    if (!id) {
      return;
    }

    const u = await this.usersService.update(id, user);
    return this.userDataConverter.trimUserSensitiveData(u);
  }
}
