import {
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { handleStartSession, handleInitTokens } from './authentication.actions';
import { authentication } from 'src/utilities/storage';

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
          return {
            ...state,
            token: null,
            scopes: null,
            expiration: null
          };
        }

        return;
      })
);

export default reducer;
