import {
  // EntityState,
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
// import { Domain } from '@rua/api-v1/lib/domains';
import { getDomainActions, createDomainActions } from './domains.actions';
import { onStart, onError } from 'src/store/store.helpers.tmp';

export interface State {
  a?: number;
}

export const initialState: State = {};

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder
      .addCase(getDomainActions.pending, (state) => {
        return onStart(state);
      })
      .addCase(getDomainActions.fulfilled, (state, actions) => {
        console.log(actions.payload, 222222222);
        return { ...state, isFetching: true };
      })
      .addCase(getDomainActions.rejected, (state, actions) => {
        console.log(actions.payload, 33333);
        return { ...state, isFetching: true };
      })
      .addCase(createDomainActions.pending, (state) => {
        return onStart(state);
      })
      .addCase(createDomainActions.fulfilled, (state, actions) => {
        console.log(actions, 222222222);
        return { ...state, isFetching: true };
      })
      .addCase(createDomainActions.rejected, (state, actions) => {
        console.log(actions, 333333333);
        const { error } = actions.payload;
        return onError(
          {
            create: error
          },
          state
        );
      })
);

export default reducer;
