import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeAll(()=> {
    jest.useFakeTimers();
  });
  
  beforeEach(() => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue({ data: 'data' });
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spyAxiosCreate = jest.spyOn(mockedAxios, 'create');

    await throttledGetDataFromApi('./api');
    jest.runAllTimers();

    expect(spyAxiosCreate).toHaveBeenCalledTimes(1);
    expect(spyAxiosCreate).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(spyAxiosCreate.mock.instances.length).toStrictEqual(1);
    expect(spyAxiosCreate.mock.results[0]?.type).toStrictEqual('return');
  });

  test('should perform request to correct provided url', async () => {
    const spyAxiosGet = jest.spyOn(mockedAxios, 'get');

    await throttledGetDataFromApi('./api');

    jest.runAllTimers();

    expect(spyAxiosGet).toHaveBeenCalledTimes(1);
    expect(spyAxiosGet).toHaveBeenCalledWith('./api');
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi('/posts')).resolves.toBe('data');
  });
});
