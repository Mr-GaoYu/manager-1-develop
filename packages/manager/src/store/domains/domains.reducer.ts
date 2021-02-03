import {
  // EntityState,
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
// import { Domain } from '@rua/api-v1/lib/domains';
import { getDomainPageActions } from './domains.actions';
import { onStart } from 'src/store/store.helpers.tmp';

export interface State {
  a?: number;
}

export const initialState: State = {};

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder
      .addCase(getDomainPageActions.pending, (state) => {
        console.log(state, 11111);
        return onStart(state);
      })
      .addCase(getDomainPageActions.fulfilled, (state, action) => {
        console.log(action, 22222);
        return { ...state, isFetching: true };
      })
      .addCase(getDomainPageActions.rejected, (state, action) => {
        console.log(action, 33333);

        return { ...state, isFetching: true };
      })
);

export default reducer;
