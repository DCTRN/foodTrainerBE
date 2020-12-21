/* eslint-disable @typescript-eslint/no-empty-function */
import {
  MealEatTimeType,
  Product,
  ProductDTO,
  UserProduct,
  UserProductDeletion,
  UserProductDTO,
  UserProductModification,
  UserProductsByDateDTO,
  UserProductsByDateRangeDTO,
} from 'src/food/models';
import { User } from 'src/users/models/user/user.model';

export const user1: User = {
  id: 1,
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date('2020-12-0T12:00:00.000Z'),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date('2020-12-0T12:00:00.000Z'),
  hashPassword: () => {},
  authenticationLevel: 1,
  isActive: true,
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
};

export const product1: Product = {
  id: 1,
  producer: 'producer from product1',
  name: 'name1',
  unit: 'gram',
  amount: 100,
  kcal: 333,
  protein: 22,
  carbohydrates: 33,
  fats: 11,
  creator: user1,
  userProducts: [],
};

export const product2: Product = {
  id: 2,
  producer: 'producer from product2',
  name: 'name2',
  unit: 'gram',
  amount: 100,
  kcal: 333,
  protein: 22,
  carbohydrates: 33,
  fats: 11,
  creator: user1,
  userProducts: [],
};

export const userProduct1: UserProduct = {
  id: 1,
  amount: 100,
  date: new Date('2020-12-0T12:00:00.000Z'),
  mealTimeType: MealEatTimeType.BREAKFAST,
  product: product1,
  user: user1,
};

export const userProduct2: UserProduct = {
  id: 2,
  amount: 100,
  date: new Date('2020-12-0T12:00:00.000Z'),
  mealTimeType: MealEatTimeType.BREAKFAST,
  product: product2,
  user: user1,
};

export const addUserProductMock1: UserProductDTO = {
  productId: 1,
  amount: 100,
  date: new Date('2020-12-0T12:00:00.000Z'),
  mealTimeType: MealEatTimeType.BREAKFAST,
  userId: 1,
};

export const modifyUserProductMock1: UserProductDTO = {
  id: 2,
  productId: 2,
  amount: 100,
  date: new Date('2020-12-0T12:00:00.000Z'),
  mealTimeType: MealEatTimeType.BREAKFAST,
  userId: 1,
};

export const modifyProductMock1: UserProductModification = {
  userId: 1,
  product: modifyUserProductMock1,
};

export const invalidModifyProductMock1: UserProductModification = {
  userId: 2,
  product: addUserProductMock1,
};

export const userProductsByDateDTO1: UserProductsByDateDTO = {
  userId: 1,
  date: new Date('2020-12-0T12:00:00.000Z'),
};

export const userProductsByDateRangeDTO1: UserProductsByDateRangeDTO = {
  userId: 1,
  start: new Date('2020-12-01T12:00:00.000Z'),
  end: new Date('2020-12-02T12:00:00.000Z'),
};

export const userProductDeletionMock1: UserProductDeletion = {
  userId: 1,
  userProductId: 1,
};
