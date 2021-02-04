import {
  // EntityState,
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
// import { Domain } from '@rua/api-v1/lib/domains';
import { getDomainActions } from './domains.actions';

export interface State {
  a?: number;
}

export const initialState: State = {};

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder
      .addCase(getDomainActions.pending, (state) => {
        console.log(11111);
        return { ...state, isFetching: true };
      })
      .addCase(getDomainActions.fulfilled, (state) => {
        console.log(state, 222222222);
        return { ...state, isFetching: true };
      })
      .addCase(getDomainActions.rejected, (state) => {
        console.log(33333);
        return { ...state, isFetching: true };
      })
);

export default reducer;
