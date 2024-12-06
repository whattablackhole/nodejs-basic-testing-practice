import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'fs';
import path from 'path';
import * as fsPromises from 'fs/promises';

jest.mock('fs/promises');

jest.mock('fs');

jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.unmock('fs/promises');
    jest.unmock('fs');
    jest.unmock('path');
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const stuff = jest.fn();

    doStuffByTimeout(stuff, 500);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(stuff, 500);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const stuff = jest.fn();

    doStuffByTimeout(stuff, 500);

    jest.advanceTimersByTime(499);

    expect(stuff).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(stuff).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(stuff, 500);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const stuff = jest.fn();

    doStuffByInterval(stuff, 500);
    expect(setInterval).toHaveBeenLastCalledWith(stuff, 500);
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const stuff = jest.fn();

    doStuffByInterval(stuff, 500);

    expect(setInterval).toHaveBeenLastCalledWith(stuff, 500);
    expect(setInterval).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(stuff).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(stuff).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();
    expect(stuff).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(499);

    expect(stuff).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(1);

    expect(stuff).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join').mockImplementationOnce(() => '');
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);

    await readFileAsynchronously('path/to/file');
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), 'path/to/file');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(path, 'join').mockImplementationOnce(() => 'path/file');
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);
    const result = await readFileAsynchronously('file');

    expect(result).toStrictEqual(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fsPromises, 'readFile').mockImplementation(async () => {
      return 'file content';
    });
    jest.spyOn(path, 'join').mockImplementationOnce(() => '');
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => true);
    const result = await readFileAsynchronously('path');

    expect(result).toStrictEqual('file content');
  });
});
