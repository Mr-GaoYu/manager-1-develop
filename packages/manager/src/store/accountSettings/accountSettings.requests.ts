import { createRequestThunk } from 'src/store/store.helpers';
import {
  getAccountSettings,
  updateAccountSettings as _update
} from '@rua/api-v1/lib/account';
import {
  requestAccountSettingsActions,
  updateAccountSettingsActions
} from './accountSettings.actions';

export const requestAccountSettings = createRequestThunk(
  requestAccountSettingsActions,
  getAccountSettings
);

export const updateAccountSettings = createRequestThunk(
  updateAccountSettingsActions,
  _update
);
