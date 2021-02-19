import {
  getUserPreferences as _getUserPreferences,
  updateUserPreferences as _updateUserPreferences
} from '@rua/api-v1/lib/profile';
import { createRequestThunk } from '../store.helpers';
import {
  handleGetPreferences,
  handleUpdatePreferences
} from './preferences.actions';

export const getUserPreferences = createRequestThunk(
  handleGetPreferences,
  _getUserPreferences
);

export const updateUserPreferences = createRequestThunk(
  handleUpdatePreferences,
  _updateUserPreferences
);
