import {
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { setLargeAccount } from './accountManagement.actions';

export interface State {
  isLargeAccount: boolean;
}

export const initialState: State = {
  isLargeAccount: false
};

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder.addCase(setLargeAccount, (state, actions) => {
      return {
        ...state,
        isLargeAccount: actions.payload
      };
    })
);

export default reducer;
