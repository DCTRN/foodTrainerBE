import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFriends } from './models/user-friends.model';
import { User } from './models/user.model';
import { UserFriendsService } from './repositories/user-friends.repository.service';
import { UsersService } from './repositories/users.service';
import { UsersController } from './users.controller';
import { UserFriendsController } from './user-friends.controller';
import { UserFriendsHandlerService } from './services/user-friends-handler.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFriends])],
  providers: [UsersService, UserFriendsService, UserFriendsHandlerService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController, UserFriendsController],
})
export class UsersModule {}
