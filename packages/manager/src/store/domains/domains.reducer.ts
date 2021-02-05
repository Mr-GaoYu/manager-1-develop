import {
  // EntityState,
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
// import { Domain } from '@rua/api-v1/lib/domains';
import { getDomainActions, createDomainActions } from './domains.actions';
import {
  onStart,
  onError
  // onCreateOrUpdate,
  // setError
} from 'src/store/store.helpers.tmp';

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
      .addCase(createDomainActions.pending, (state, actions) => {
        console.log(actions, 111111);
        // return setError({ create: undefined }, state);
      })
      .addCase(createDomainActions.fulfilled, (state, actions) => {
        console.log(actions, 222222222);
        // return onCreateOrUpdate(actions.payload,state);
      })
      .addCase(createDomainActions.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            create: error
          },
          state
        );
      })
);

export default reducer;
