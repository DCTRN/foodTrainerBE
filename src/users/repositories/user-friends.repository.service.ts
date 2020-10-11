import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IUserFriends } from '../models/user-friends.interface';
import { UserFriends } from '../models/user-friends.model';

@Injectable()
export class UserFriendsService {
  constructor(
    @InjectRepository(UserFriends)
    private userFriendsRepository: Repository<UserFriends>,
  ) {}

  public async add(userFriendRequest: IUserFriends): Promise<UserFriends> {
    const dbUserFriendRequest = this.userFriendsRepository.create(
      userFriendRequest,
    );
    return this.userFriendsRepository.save(dbUserFriendRequest);
  }

  public async update(
    id: number,
    userFriend: Partial<UserFriends>,
  ): Promise<UserFriends> {
    await this.userFriendsRepository.update(id, userFriend);
    return this.findById(id);
  }

  public async findById(id: number): Promise<UserFriends> {
    return this.userFriendsRepository.findOne(id);
  }

  public async findByUserId(id: number): Promise<Array<UserFriends>> {
    const userFriends = await this.userFriendsRepository.find({
      where: { userId: id },
    });

    if (!userFriends?.length) {
      return;
    }
    return userFriends;
  }

  public async findAll(): Promise<Array<UserFriends>> {
    return this.userFriendsRepository.find();
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.userFriendsRepository.delete(id);
  }
}
