import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFriends } from './models/user-friends/user-friends.model';
import { User } from './models/user/user.model';
import { UserFriendsService } from './repositories/user-friends.repository.service';
import { UsersService } from './repositories/users.service';
import { UserFriendsHandlerService } from './services/user-friends-handler.service';
import { UserFriendsController } from './user-friends.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFriends])],
  providers: [UsersService, UserFriendsService, UserFriendsHandlerService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController, UserFriendsController],
})
export class UsersModule {}
