import { APIError } from '@rua/api-v1/lib/types';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';
import { EntityError, RequestableData } from '../types';
import {
  ExtendedProfile,
  getProfileActions,
  handleUpdateProfile
} from './profile.actions';

export type State = RequestableData<ExtendedProfile, EntityError>;

interface Action<T> {
  type: string;
  error?: APIError[];
  payload?: T;
}

export const defaultState: State = {
  lastUpdated: 0,
  loading: false,
  data: undefined,
  error: undefined
};

const reducer: Reducer<State> = (
  state: State = defaultState,
  action: Action<ExtendedProfile>
) => {
  if (isType(action, getProfileActions.started)) {
    const loading = state.data ? false : true;

    return { ...state, loading };
  }

  if (isType(action, getProfileActions.done)) {
    const { result } = action.payload;
    return {
      ...state,
      error: undefined,
      loading: false,
      lastUpdated: Date.now(),
      data: result
    };
  }

  if (isType(action, getProfileActions.failed)) {
    const { error } = action.payload;
    return {
      ...state,
      loading: false,
      lastUpdated: Date.now(),
      error: {
        read: error
      }
    };
  }

  if (isType(action, handleUpdateProfile.started)) {
    return {
      ...state,
      loading: true
    };
  }

  if (isType(action, handleUpdateProfile.done)) {
    return {
      ...state,
      loading: false,
      lastUpdated: Date.now(),
      error: undefined,
      data: {
        ...state.data!,
        ...action.payload.result
      }
    };
  }

  if (isType(action, handleUpdateProfile.failed)) {
    return {
      ...state,
      loading: false,
      lastUpdated: Date.now(),
      error: {
        update: action.payload.error
      }
    };
  }

  return state;
};

export default reducer;
