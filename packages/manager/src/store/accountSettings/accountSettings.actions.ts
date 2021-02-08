import actionCreatorFactory from 'typescript-fsa';
import { APIError } from '@rua/api-v1/lib/types';
import { AccountSettings } from '@rua/api-v1/lib/account';

export const actionCreator = actionCreatorFactory(`@@manager/Account/Settings`);

export const requestAccountSettingsActions = actionCreator.async<
  void,
  AccountSettings,
  APIError[]
>('request');

export const updateAccountSettingsActions = actionCreator.async<
  Partial<AccountSettings>,
  AccountSettings,
  APIError[]
>('update');

export const updateSettingsInStore = actionCreator<Partial<AccountSettings>>(
  'update-store'
);
