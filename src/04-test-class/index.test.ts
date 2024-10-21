import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  let account: BankAccount;
  let transferAccount: BankAccount;

  beforeAll(() => {
    account = getBankAccount(100);
    transferAccount = getBankAccount(0);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toStrictEqual(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(120)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(120, transferAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(120, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(50).getBalance()).toStrictEqual(150);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(10).getBalance()).toStrictEqual(140);
  });

  test('should transfer money', () => {
    account.transfer(120, transferAccount);
    expect(account.getBalance()).toStrictEqual(20);
    expect(transferAccount.getBalance()).toStrictEqual(120);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockImplementationOnce(() => 33);
    jest.spyOn(lodash, 'random').mockImplementationOnce(() => 1);

    const result = await account.fetchBalance();

    expect(typeof result).toStrictEqual('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockImplementationOnce(async () => 50);

    await account.synchronizeBalance();

    expect(account.getBalance()).toStrictEqual(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementationOnce(async () => null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
