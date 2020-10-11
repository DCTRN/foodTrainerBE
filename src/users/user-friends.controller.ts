import { x } from '@hapi/joi';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserFriendsDTO } from './models/user-friends-dto.model';
import { UserFriends } from './models/user-friends.model';
import { UserfrienWithUserData } from './models/userfriend-with-user-data.model';
import { UserFriendsHandlerService } from './services/user-friends-handler.service';

@Controller('userFriends')
export class UserFriendsController {
  constructor(private userFriendsHandlerService: UserFriendsHandlerService) {}
  @Get('')
  public async getAllUserFriends(
    @Query('userId') userId: number,
  ): Promise<Array<UserfrienWithUserData>> {
    return await this.userFriendsHandlerService.getAllUserFriendsByUserIs(
      userId,
    );
  }

  @Post('')
  public async sendFriendRequest(
    @Body(ValidationPipe) userFriendRequest: UserFriendsDTO,
  ): Promise<UserFriends> {
    return await this.userFriendsHandlerService.sendFriendRequest(
      userFriendRequest,
    );
  }

  @Post('')
  public async acceptFriendRequest(
    @Query('userFriendId') userFriendId: number,
  ): Promise<UserFriends> {
    return await this.userFriendsHandlerService.acceptFriendRequest(
      userFriendId,
    );
  }
}
