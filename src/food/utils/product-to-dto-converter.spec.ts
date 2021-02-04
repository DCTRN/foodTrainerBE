/* eslint-disable @typescript-eslint/no-empty-function */
import { isEqual } from 'lodash';
import { User } from 'src/users/models/user/user.model';
import { Product, ProductDTO } from '../models';
import { ProductToDTOConverter } from './product-to-dto-converter';

const userMock1: User = {
  id: 1,
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  hashPassword: () => {},
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
};

const producer1 = 'producer1';
const name1 = 'name1';
const gram1 = 'gram';
const amount1 = 100;
const kcal1 = 333;
const protein1 = 33;
const carbohydrates1 = 22;
const fats1 = 11;

const producer2 = 'producer2';
const name2 = 'name2';
const gram2 = 'gram';
const amount2 = 100;
const kcal2 = 323;
const protein2 = 23;
const carbohydrates2 = 23;
const fats2 = 41;

const productMock1: Product = {
  id: 1,
  producer: producer1,
  name: name1,
  unit: gram1,
  amount: amount1,
  kcal: kcal1,
  protein: protein1,
  carbohydrates: carbohydrates1,
  fats: fats1,
  creator: userMock1,
  userProducts: [],
};

const InvalidproductMock1: Product = {
  id: 1,
  producer: '',
  name: name1,
  unit: gram1,
  amount: amount1,
  kcal: kcal1,
  protein: protein1,
  carbohydrates: carbohydrates1,
  fats: fats1,
  creator: userMock1,
  userProducts: [],
};

const productMock2: Product = {
  id: 2,
  producer: producer2,
  name: name2,
  unit: gram2,
  amount: amount2,
  kcal: kcal2,
  protein: protein2,
  carbohydrates: carbohydrates2,
  fats: fats2,
  creator: userMock1,
  userProducts: [],
};

const validProductDTOMock1: ProductDTO = {
  id: 1,
  producer: producer1,
  name: name1,
  unit: gram1,
  amount: amount1,
  kcal: kcal1,
  protein: protein1,
  carbohydrates: carbohydrates1,
  fats: fats1,
  creatorId: 1,
};

const validProductDTOMock2: ProductDTO = {
  id: 2,
  producer: producer2,
  name: name2,
  unit: gram2,
  amount: amount2,
  kcal: kcal2,
  protein: protein2,
  carbohydrates: carbohydrates2,
  fats: fats2,
  creatorId: 1,
};

// TODO check

describe('ProductToDtoconverter', () => {
  it('should be defined', () => {
    expect(new ProductToDTOConverter()).toBeDefined();
  });

  it('should translate product successfully', () => {
    const productToDtoconverter = new ProductToDTOConverter();

    const productDTO = productToDtoconverter.convertProduct(productMock1);

    expect(isEqual(productDTO, validProductDTOMock1)).toEqual(true);
  });

  // it('should fail to  translate product', () => {
  //   const productToDtoconverter = new ProductToDTOConverter();
  //   try {
  //     productToDtoconverter.convertProduct(InvalidproductMock1);
  //   } catch (error) {
  //     expect(error).toBeTruthy();
  //   }
  // });

  it('should translate products successfully', () => {
    const products = [productMock1, productMock2];
    const expedtecProductsDTO = [validProductDTOMock1, validProductDTOMock2];
    const productToDtoconverter = new ProductToDTOConverter();
    const producstDTO = productToDtoconverter.convertProducts(products);

    expect(producstDTO.length).toEqual(2);
    expect(isEqual(producstDTO, expedtecProductsDTO)).toEqual(true);
  });
});
