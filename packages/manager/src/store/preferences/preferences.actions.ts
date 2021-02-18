import { APIError } from '@rua/api-v1/lib/types';
import { actionCreatorFactory } from 'typescript-fsa';
// import { SpacingChoice, ThemeChoice } from 'src/ThemeWrapper'

const actionCreator = actionCreatorFactory(`@@manager/Preferences`);

export interface UserPreferences {}

export const handleGetPreferences = actionCreator.async<
  void,
  UserPreferences,
  APIError[]
>(`get`);

export const handleUpdatePreferences = actionCreator.async<
  UserPreferences,
  UserPreferences,
  APIError[]
>(`update`);
