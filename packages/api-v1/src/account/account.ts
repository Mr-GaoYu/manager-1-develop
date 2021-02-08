import { API_ROOT } from 'src/constants';
import Request, { setMethod, setURL, setData } from 'src/request';
import { Account, AccountSettings } from './types';
import {
  updateAccountSchema,
  updateAccountSettingsSchema
} from './account.schema';

export const getAccountInfo = () =>
  Request<Account>(setURL(`${API_ROOT}/account`), setMethod('GET'));

export const updateAccountInfo = (data: Partial<Account>) =>
  Request<Account>(
    setURL(`${API_ROOT}/account`),
    setMethod('PUT'),
    setData(data, updateAccountSchema)
  );

export const getAccountSettings = () =>
  Request<AccountSettings>(
    setURL(`${API_ROOT}/account/settings`),
    setMethod('GET')
  );

export const updateAccountSettings = (data: Partial<AccountSettings>) =>
  Request<AccountSettings>(
    setURL(`${API_ROOT}/account/settings`),
    setMethod('PUT'),
    setData(data, updateAccountSettingsSchema)
  );
