import { Test, TestingModule } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
import { DbConstraintExceptionsFilter } from './db-constraint-exceptions.filter';
import {
  mockArgumentsHost,
  mockHttpArgumentsHost,
  mockGetResponse,
  mockStatus,
  mockJson,
} from './filters-mocks';

describe('DbConstraintExceptionsFilter', () => {
  let service: DbConstraintExceptionsFilter;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbConstraintExceptionsFilter],
    }).compile();
    service = module.get<DbConstraintExceptionsFilter>(
      DbConstraintExceptionsFilter,
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Http exception', () => {
    const result = service.catch(
      new Error('"Username must be uniqe"'),
      mockArgumentsHost,
    );
    expect(mockHttpArgumentsHost).toBeCalledTimes(1);
    expect(mockGetResponse).toBeCalledTimes(1);
    expect(mockStatus).toBeCalledTimes(1);
    expect(mockJson).toBeCalledTimes(1);
    expect(result.error.errorDescription).toEqual('Username must be uniqe');
  });
});
