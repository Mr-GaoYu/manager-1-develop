import { getEnvLocalStorageOverrides } from 'src/utilities/storage';
import { APP_ROOT, CLIENT_ID, LOGIN_ROOT } from 'src/website/constants';
import { stringify } from 'querystring';
import { authentication } from 'src/utilities/storage';
import { v4 } from 'uuid';
import Axios from 'axios';

export const genOAuthEndpoint = (
  redirectUrl: string,
  scope = '*',
  nonce: string
) => {
  const localStorageOverrides = getEnvLocalStorageOverrides();
  const clientID = localStorageOverrides?.clientID ?? CLIENT_ID;
  const loginRoot = localStorageOverrides?.loginRoot ?? LOGIN_ROOT;

  const query = {
    client_id: clientID,
    scope,
    response_type: 'token',
    redirect_uri: `${APP_ROOT}/oauth/callback?returnTo=${redirectUrl}`,
    state: nonce
  };

  return `${loginRoot}/oauth/authorize?${stringify(query)}`;
};

export const prepareOAuthEndpoint = (redirectUrl: string, scope = '*') => {
  const nonce = v4();
  authentication.nonce.set(nonce);
  return genOAuthEndpoint(redirectUrl, scope, nonce);
};

export const redirectToLogin = (
  returnToPath: string,
  queryString: string = ''
) => {
  const redirectUrl = `${returnToPath}${queryString}`;
  window.location.assign(prepareOAuthEndpoint(redirectUrl));
};

export interface RevokeTokenSuccess {
  success: true;
}

export const revokeToken = (client_id: string, token: string) => {
  const localStorageOverrides = getEnvLocalStorageOverrides();

  const loginURL = localStorageOverrides?.loginRoot ?? LOGIN_ROOT;

  return Axios({
    baseURL: loginURL,
    url: `/oauth/revoke`,
    method: 'POST',
    data: stringify({ client_id, token }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });
};
