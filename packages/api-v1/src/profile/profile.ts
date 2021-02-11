import { API_ROOT } from 'src/constants';
import { Grants } from '../account';
import Request, {
  setMethod,
  setParams,
  setURL,
  setData,
  setXFilter
} from 'src/request';
import { ResourcePage as Page } from 'src/types';
import { Profile, TrustedDevice, UserPreferences, ProfileLogin } from './types';
import { updateProfileSchema } from './profile.schema';

export const getProfile = () =>
  Request<Profile>(setURL(`${API_ROOT}/profile`), setMethod('GET'));

export const updateProfile = (data: any) =>
  Request<Profile>(
    setURL(`${API_ROOT}/profile`),
    setMethod('PUT'),
    setData(data, updateProfileSchema)
  );

export const listGrants = () =>
  Request<Grants>(setURL(`${API_ROOT}/profile/grants`));

export const getMyGrants = () =>
  Request<Grants>(setURL(`${API_ROOT}/profile/grants`), setMethod('GET'));

export const getTrustedDevices = (params: any, filter: any) =>
  Request<Page<TrustedDevice>>(
    setURL(`${API_ROOT}/profile/devices`),
    setMethod('GET'),
    setXFilter(filter),
    setParams(params)
  );

export const deleteTrustedDevice = (id: number) =>
  Request<{}>(setURL(`${API_ROOT}/profile/devices/${id}`), setMethod('DELETE'));

export const getUserPreferences = () =>
  Request<Record<string, any>>(setURL(`${API_ROOT}/profile/preferences`));

export const updateUserPreferences = (payload: UserPreferences) =>
  Request<UserPreferences>(
    setURL(`${API_ROOT}/profile/preferences`),
    setData(payload),
    setMethod('PUT')
  );

export const getLogins = (params: any, filter: any) => {
  return Request<Page<ProfileLogin>>(
    setURL(`${API_ROOT}/profile/logins`),
    setMethod('GET'),
    setXFilter(filter),
    setParams(params)
  );
};
