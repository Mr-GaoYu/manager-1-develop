import { LOGIN_ROOT } from 'src/website/constants';
import { revokeToken, RevokeTokenSuccess } from 'src/utilities/session';
import { ThunkActionCreator, ThunkDispatch } from 'src/store/types';
import { getEnvLocalStorageOverrides } from 'src/utilities/storage';
import { handleLogout as _handleLogout } from './authentication.actions';

export const handleLogout: ThunkActionCreator<
  Promise<RevokeTokenSuccess>,
  { client_id: string; token: string }
> = ({ client_id, token }) => (dispatch: ThunkDispatch) => {
  const localStorageOverrides = getEnvLocalStorageOverrides();

  const loginURL = localStorageOverrides?.loginRoot ?? LOGIN_ROOT;

  return revokeToken(client_id, token)
    .then((response) => {
      dispatch(_handleLogout);

      window.location.assign(`${loginURL}/logout`);
      return response;
    })
    .catch((err) => {
      dispatch(_handleLogout());

      window.location.assign(`${loginURL}/logout`);
      return err;
    });
};
