import { HttpException, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { GlobalExceptionsFilter } from './global-exceptions.filter';
import {
  mockArgumentsHost,
  mockHttpArgumentsHost,
  mockGetResponse,
  mockStatus,
  mockJson,
} from './filters-mocks';

describe('All exception filter tests', () => {
  let service: GlobalExceptionsFilter<any>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalExceptionsFilter],
    }).compile();
    service = module.get<GlobalExceptionsFilter<any>>(GlobalExceptionsFilter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Http exception', () => {
    service.catch(
      new HttpException('Http exception', HttpStatus.BAD_REQUEST),
      mockArgumentsHost,
    );
    expect(mockHttpArgumentsHost).toBeCalledTimes(1);
    expect(mockGetResponse).toBeCalledTimes(1);
    expect(mockStatus).toBeCalledTimes(1);
    expect(mockJson).toBeCalledTimes(1);
  });
});
