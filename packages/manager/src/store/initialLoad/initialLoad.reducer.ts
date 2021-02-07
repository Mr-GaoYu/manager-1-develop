import {
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { handleLoadingDone } from './initialLoad.actions';

export interface State {
  appIsLoading: boolean;
  loadingText: string;
}

export const initialState: State = {
  appIsLoading: true,
  loadingText: ''
};

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder.addCase(handleLoadingDone, (state) => {
      return {
        ...state,
        appIsLoading: false
      };
    })
);

export default reducer;
