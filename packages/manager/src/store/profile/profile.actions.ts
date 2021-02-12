import { Grants } from '@rua/api-v1/lib/account';
import { Profile } from '@rua/api-v1/lib/profile';
import { actionCreatorFactory } from 'typescript-fsa';
import { APIError } from '@rua/api-v1/lib/types';

export interface ExtendedProfile extends Profile {
  grants?: Grants;

  _euuidFromHttpHeader?: string;
}

const actionCreator = actionCreatorFactory(`@@manager/Profile`);

export const getProfileActions = actionCreator.async<
  void,
  ExtendedProfile,
  APIError[]
>(`request`);

export const handleUpdateProfile = actionCreator.async<
  Partial<Profile>,
  Partial<Profile>,
  APIError[]
>(`update`);
