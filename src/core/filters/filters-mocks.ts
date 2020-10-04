export const mockJson = jest.fn();
export const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
export const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockGetRequest = jest.fn().mockImplementation(() => ({
  url: 'mockUrl',
}));
export const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
}));
export const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};
