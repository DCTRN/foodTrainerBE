import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockArgumentsHost } from './filters-mocks';
import { UnauthorizedFilter } from './unauthorized.filter';

describe('UnauthorizedFilter', () => {
  let service: UnauthorizedFilter;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnauthorizedFilter],
    }).compile();
    service = module.get<UnauthorizedFilter>(UnauthorizedFilter);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Http exception', () => {
    const message = 'Unauthorized';
    const error = 'auth.unauthorized';
    const code = 401;
    const result = service.catch(
      new UnauthorizedException(message),
      mockArgumentsHost,
    );

    expect(result.error.errorDescription).toEqual(message);
    expect(result.error.error).toEqual(error);
    expect(result.statusCode).toEqual(code);
  });
});
