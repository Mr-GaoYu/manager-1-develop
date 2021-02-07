import { LOGIN_ROOT } from 'src/website/constants';
import { revokeToken, RevokeTokenSuccess } from 'src/utilities/session';
import { getEnvLocalStorageOverrides } from 'src/utilities/storage';
import { handleLogout as _handleLogout } from './authentication.actions';
import { ThunkActionCreator, ThunkDispatch } from 'src/store/types';

export const handleLogout: ThunkActionCreator<
  Promise<RevokeTokenSuccess>,
  {
    client_id: string;
    token: string;
  }
> = ({ client_id, token }) => (dispatch: ThunkDispatch) => {
  const localStorageOverrides = getEnvLocalStorageOverrides();

  const loginURL = localStorageOverrides?.loginRoot ?? LOGIN_ROOT;

  return revokeToken(client_id, token)
    .then((result) => {
      dispatch(_handleLogout());

      window.location.assign(`${loginURL}/logout`);
      return result;
    })
    .catch((error) => {
      dispatch(_handleLogout());

      window.location.assign(`${loginURL}/logout`);
      return error;
    });
};
