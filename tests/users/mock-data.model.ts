/* eslint-disable @typescript-eslint/no-empty-function */
import { UserDetailsDTO } from 'src/users/models/user/user-details-dto.model';
import { UserDetails } from 'src/users/models/user/user-details.model';
import { UserDTO } from 'src/users/models/user/user-dto.model';
import { UserNutritionGoalsDTO } from 'src/users/models/user/user-nutrition-goals-dto.model';
import { UserNutritionGoals } from 'src/users/models/user/user-nutrition-goals.model';
import { UserWithNutritionGoalsDTO } from 'src/users/models/user/user-with-nurition-goals-dto.model';
import { User } from 'src/users/models/user/user.model';
import * as bcrypt from 'bcrypt';

export const userDetailsDTO1: UserDetailsDTO = {
  age: 30,
  height: 180,
  weight: 75,
  sex: 'MALE',
};

export const userDetailsDTO1Modified: UserDetailsDTO = {
  age: 33,
  height: 175,
  weight: 90,
  sex: 'FEMALE',
};

export const userDetails1: UserDetails = {
  id: 1,
  ...userDetailsDTO1,
  user: null,
};

export const userDetails1Modified: UserDetails = {
  id: 1,
  ...userDetailsDTO1Modified,
  user: null,
};

export const nutritionGoalsDTO1: UserNutritionGoalsDTO = {
  kcal: 3000,
  protein: 25,
  carbs: 50,
  fats: 25,
};

export const nutritionGoals1: UserNutritionGoals = {
  id: 1,
  ...nutritionGoalsDTO1,
  user: null,
};

export const userDTO1: UserDTO = {
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date('2020-12-0T12:00:00.000Z'),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  details: userDetails1,
};

export const userDTO2: UserDTO = {
  username: 'usernameMock2',
  password: 'secretPassword123',
  email: 'someemail2@gmail.com',
  birthDate: new Date('2020-12-0T12:00:00.000Z'),
  phoneNumber: '123123124',
  firstName: 'firstName2',
  lastName: 'lastName2',
  details: userDetails1,
};

export const userDTO3: UserDTO = {
  username: 'usernameMock3',
  password: 'secretPassword123',
  email: 'someemail3@gmail.com',
  birthDate: new Date('2020-12-0T12:00:00.000Z'),
  phoneNumber: '1231231235',
  firstName: 'firstName3',
  lastName: 'lastName3',
  details: userDetails1,
};

export const userDTO1Modified: UserDTO = {
  username: 'usernameMockModified',
  password: 'secretPassword123Modified',
  email: 'someemail@gmail.comModified',
  birthDate: new Date(),
  phoneNumber: '666777888Modified',
  firstName: 'firstNameModified',
  lastName: 'lastNameModified',
  details: userDetails1Modified,
};

export const userWithNutritionGoalsDTO1: UserWithNutritionGoalsDTO = {
  ...userDTO1,
  nutritionGoals: nutritionGoalsDTO1,
};

export const user1: User = {
  id: 1,
  ...userDTO1,
  accountCreationDate: new Date('2020-12-0T12:00:00.000Z'),
  hashPassword: () => {},
  authenticationLevel: 1,
  isActive: true,
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
  nutritionGoals: nutritionGoals1,
  details: userDetails1,
};

export const user2: User = {
  id: 2,
  ...userDTO2,
  accountCreationDate: new Date('2020-12-0T12:00:00.000Z'),
  hashPassword: () => {},
  authenticationLevel: 1,
  isActive: true,
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
  nutritionGoals: nutritionGoals1,
  details: userDetails1,
};

export const user3: User = {
  id: 3,
  ...userDTO3,
  accountCreationDate: new Date('2020-12-0T12:00:00.000Z'),
  hashPassword: () => {},
  authenticationLevel: 1,
  isActive: true,
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
  nutritionGoals: nutritionGoals1,
  details: userDetails1,
};

export const user1Modified: User = {
  id: 1,
  ...userDTO1Modified,
  accountCreationDate: new Date('2020-12-0T12:00:00.000Z'),
  hashPassword: () => {},
  authenticationLevel: 1,
  isActive: true,
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
  nutritionGoals: nutritionGoals1,
  details: userDetails1Modified,
};

export const userFromDb1: User = {
  ...user1,
  password: bcrypt.hashSync('password', 10),
  hashPassword: () => {},
};
