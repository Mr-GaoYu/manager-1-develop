import {
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import {
  handleStartSession,
  handleInitTokens,
  handleLogout,
  handleRefreshTokens
} from './authentication.actions';
import { authentication } from 'src/utilities/storage';
import { redirectToLogin } from 'src/utilities/session';
import { clearLocalStorage } from './authentication.helpers';

export interface State {
  token: null | string;
  scopes: null | string;
  expiration: null | string;
  loggedInAsCustomer: boolean;
}

export const initialState: State = {
  token: null,
  scopes: null,
  expiration: null,
  loggedInAsCustomer: false
};

const {
  token: tokenInLocalStorage,
  scopes: scopesInLocalStorage,
  expire: expiryInLocalStorage
} = authentication;

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder
      .addCase(handleStartSession, (state, actions) => {
        const { expires, token, scopes } = actions.payload;

        scopesInLocalStorage.set(scopes || '');
        tokenInLocalStorage.set(token || '');
        expiryInLocalStorage.set(expires || '');

        return {
          ...state,
          token: token || null,
          scopes: scopes || null,
          expiration: expires || null
        };
      })
      .addCase(handleInitTokens, (state) => {
        const expiryDateFromLocalStorage = expiryInLocalStorage.get();
        const expiryDate = new Date(expiryDateFromLocalStorage);

        if (expiryDateFromLocalStorage && expiryDate < new Date()) {
          redirectToLogin(location.pathname, location.search);

          return {
            ...state,
            token: null,
            scopes: null,
            expiration: null
          };
        }

        const token = tokenInLocalStorage.get();
        const scopes = scopesInLocalStorage.get();

        if (!token) {
          redirectToLogin(location.pathname, location.search);
        }

        const isLoggedInAsCustomer = (token || '')
          .toLowerCase()
          .includes('admin');

        return {
          ...state,
          token,
          scopes,
          expiration: expiryDateFromLocalStorage,
          loggedInAsCustomer: isLoggedInAsCustomer
        };
      })
      .addCase(handleLogout, (state) => {
        clearLocalStorage();

        return {
          ...state,
          scopes: null,
          token: null,
          expiration: null,
          loggedInAsCustomer: false
        };
      })
      .addCase(handleRefreshTokens, (state) => {
        const [localToken, localScopes, localExpiry] = [
          tokenInLocalStorage.get(),
          scopesInLocalStorage.get(),
          expiryInLocalStorage.get()
        ];

        return {
          ...state,
          token: localToken,
          scopes: localScopes,
          expiration: localExpiry
        };
      })
);

export default reducer;
