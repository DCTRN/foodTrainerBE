import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { IUserFriends } from '../models/user-friends/user-friends.interface';
import { UserFriends } from '../models/user-friends/user-friends.model';
import { User } from '../models/user/user.model';
import { UsersService } from './users.service';

@Injectable()
export class UserFriendsService {
  constructor(
    @InjectRepository(UserFriends)
    private userFriendsRepository: Repository<UserFriends>,
    private usersService: UsersService,
  ) {}

  public async add(userFriendRequest: IUserFriends): Promise<UserFriends> {
    await this.checkIfRelationAlreadyExists(userFriendRequest);
    const user = await this.getUserDataById(userFriendRequest.userId);
    const friend = await this.getUserDataById(userFriendRequest.friendId);
    const userFriend = this.createNeededRelations(user, friend);
    return await this.saveUserFriendRelationToDb(userFriend);
  }

  public async update(id: number): Promise<UserFriends> {
    const entity = await this.findById(id);
    this.throwUpdateRelatedErrors(entity);
    entity.isAccepted = true;
    return await this.userFriendsRepository.save(entity);
  }

  public async findById(id: number): Promise<UserFriends> {
    return this.userFriendsRepository.findOne(id);
  }

  public async findByUserId(id: number): Promise<Array<UserFriends>> {
    const result = await this.usersService.findById(id);
    if (!result) {
      throw new Error('There is no user with given id');
    }
    return await this.createQueryForUserFriendsByGivenUserId(id);
  }

  public async findAll(): Promise<Array<UserFriends>> {
    return this.userFriendsRepository.find();
  }

  public async delete(id: number): Promise<DeleteResult> {
    const entity = await this.findById(id);
    this.throwErrorIfThereIsNoSuchEntity(entity);
    return this.userFriendsRepository.delete(id);
  }

  private throwUpdateRelatedErrors(entity: UserFriends) {
    this.throwErrorIfThereIsNoSuchEntity(entity);
    this.throwErrorIfEntityIsAlreadyAccepted(entity);
  }

  private throwErrorIfEntityIsAlreadyAccepted(entity: UserFriends) {
    if (entity.isAccepted) {
      throw new Error('Cannot update existing entity');
    }
  }

  private throwErrorIfThereIsNoSuchEntity(entity: UserFriends) {
    if (!entity) {
      throw new Error('There is no user friend request with given id');
    }
  }

  private async createQueryForUserFriendsByGivenUserId(
    id: number,
  ): Promise<UserFriends[]> {
    const test = await this.userFriendsRepository
      .createQueryBuilder('user_friends')
      .innerJoinAndSelect('user_friends.friend', 'friend')
      .innerJoinAndSelect('user_friends.user', 'user')
      .where('user.id = :userId', { userId: id })
      .orWhere('friend.id = :friendId', { friendId: id })
      .getMany();
    return test;
  }

  private async saveUserFriendRelationToDb(
    userFriend: DeepPartial<UserFriends>,
  ) {
    const dbUserFriendRequest = this.userFriendsRepository.create(userFriend);
    const result = await this.userFriendsRepository.save(dbUserFriendRequest);
    return result;
  }

  private createNeededRelations(user: User, friend: User) {
    return this.createUserFriendRow(user, friend);
  }

  private createUserFriendRow(
    user: User,
    friend: User,
  ): DeepPartial<UserFriends> {
    return {
      user,
      friend,
      friendshipRequesterId: user.id,
    };
  }

  private async checkIfRelationAlreadyExists(userFriendRequest: IUserFriends) {
    const isAlreadyExists = await this.createQueryForRelationExistence(
      userFriendRequest,
    );
    this.throwErrorIfRowAlreadyExists(isAlreadyExists);
  }

  private throwErrorIfRowAlreadyExists(isAlreadyExists: UserFriends[]) {
    if (isAlreadyExists?.length) {
      throw new Error(
        'User friends relation already exists or request for friendship is pending',
      );
    }
  }

  private async createQueryForRelationExistence(
    userFriendRequest: IUserFriends,
  ) {
    return await this.userFriendsRepository
      .createQueryBuilder('user_friends')
      .innerJoinAndSelect('user_friends.friend', 'friend')
      .innerJoinAndSelect('user_friends.user', 'user')
      .where('user.id = :userId', { userId: userFriendRequest.userId })
      .andWhere('friend.id = :friendId', {
        friendId: userFriendRequest.friendId,
      })
      .orWhere('user.id = :friendId', {
        friendId: userFriendRequest.friendId,
      })
      .andWhere('friend.id = :userId', { userId: userFriendRequest.userId })
      .getMany();
  }

  private async getUserDataById(id: number) {
    return await this.usersService.findById(id);
  }
}
