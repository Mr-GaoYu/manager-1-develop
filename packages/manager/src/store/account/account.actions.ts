import { actionCreatorFactory } from 'typescript-fsa';
import { Account } from '@rua/api-v1/lib/account';
import { APIError } from '@rua/api-v1/lib/types';

export const actionCreator = actionCreatorFactory(`@@manager/Account`);

export const requestAccountActions = actionCreator.async<
  void,
  Account,
  APIError[]
>('request');

export type UpdateAccountParams = Partial<Account>;

export const updateAccountActions = actionCreator.async<
  UpdateAccountParams,
  Account,
  APIError[]
>(`update`);

export const saveCreditCard = actionCreator<Account['credit_card']>(
  'update-credit-card'
);
