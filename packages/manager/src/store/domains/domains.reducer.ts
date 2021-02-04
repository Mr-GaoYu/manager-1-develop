import {
  // EntityState,
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
// import { Domain } from '@rua/api-v1/lib/domains';
import { createDomainActions } from './domains.actions';

export interface State {
  a?: number;
}

export const initialState: State = {};

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder
      .addCase(createDomainActions.pending, (state) => {
        console.log(11111);
        return { ...state, isFetching: true };
      })
      .addCase(createDomainActions.fulfilled, (state) => {
        console.log(22222);
        return { ...state, isFetching: true };
      })
      .addCase(createDomainActions.rejected, (state) => {
        return { ...state, isFetching: true };
      })
);

export default reducer;
