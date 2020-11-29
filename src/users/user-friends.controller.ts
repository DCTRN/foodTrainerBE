import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access-auth.guard';
import { DeleteResult } from 'typeorm';
import { UserfriendWithoutSensitiveData } from './models/user-friends/user-friend-with-user-data.model';
import { UserFriendsDTO } from './models/user-friends/user-friends-dto.model';
import { UserfriendsWithoutSensitiveData } from './models/user-friends/user-friends-without-sensitive-data.model';
import { UserFriendsHandlerService } from './services/user-friends-handler.service';

@Controller('userFriends')
// @UseGuards(JwtAccessAuthGuard)
export class UserFriendsController {
  constructor(private userFriendsHandlerService: UserFriendsHandlerService) {}
  @Get('')
  public async getAllUserFriends(
    @Query('userId') userId: number,
  ): Promise<Array<UserfriendWithoutSensitiveData>> {
    return await this.userFriendsHandlerService.getAllUserFriendsByUserIds(
      userId,
    );
  }

  @Post('')
  public async sendFriendRequest(
    @Body(ValidationPipe) userFriendRequest: UserFriendsDTO,
  ): Promise<UserfriendsWithoutSensitiveData> {
    return await this.userFriendsHandlerService.sendFriendRequest(
      userFriendRequest,
    );
  }

  @Patch('')
  public async acceptFriendRequest(
    @Query('userFriendId') userFriendId: number,
  ): Promise<UserfriendsWithoutSensitiveData> {
    return await this.userFriendsHandlerService.acceptFriendRequest(
      userFriendId,
    );
  }

  @Delete('')
  @HttpCode(204)
  public async deleteUserFriend(
    @Query('userFriendId') userFriendId: number,
  ): Promise<DeleteResult> {
    return await this.userFriendsHandlerService.deleteUserFriend(userFriendId);
  }
}
