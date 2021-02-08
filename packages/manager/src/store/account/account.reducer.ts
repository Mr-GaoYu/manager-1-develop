import produce from 'immer';
import { Account } from '@rua/api-v1/lib/account';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';
import {
  requestAccountActions,
  updateAccountActions,
  saveCreditCard
} from './account.actions';
import { RequestableDataWithEntityError } from 'src/store/types';

export type State = RequestableDataWithEntityError<Account>;

export const defaultState: State = {
  loading: false,
  error: {},
  lastUpdated: 0,
  data: undefined
};

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  return produce(state, (draft) => {
    if (isType(action, requestAccountActions.started)) {
      draft.loading = true;
    }

    if (isType(action, requestAccountActions.done)) {
      const { result } = action.payload;

      draft.loading = false;
      draft.data = result;
      draft.lastUpdated = Date.now();
      draft.error.read = undefined;
    }

    if (isType(action, requestAccountActions.failed)) {
      const { error } = action.payload;

      draft.loading = false;
      draft.error.read = error;
    }

    if (isType(action, updateAccountActions.started)) {
      draft.loading = true;
      draft.error.update = undefined;
    }

    if (isType(action, updateAccountActions.done)) {
      const { result } = action.payload;

      draft.loading = false;
      draft.data = result;
      draft.lastUpdated = Date.now();
      draft.error.update = undefined;
      draft.error.read = undefined;
    }

    if (isType(action, updateAccountActions.failed)) {
      const { error } = action.payload;

      draft.loading = false;
      draft.error.update = error;
    }

    if (isType(action, saveCreditCard)) {
      const { payload } = action;

      if (!draft.data) {
        return;
      }

      draft.data.credit_card = payload;
    }
  });
};

export default reducer;
