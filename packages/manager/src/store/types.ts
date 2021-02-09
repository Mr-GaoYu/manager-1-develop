import { APIError } from '@rua/api-v1/lib/types';
import { MapStateToProps as _MapStateToProps } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch as _ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from 'src/store';

export type MapState<S, O> = _MapStateToProps<S, O, ApplicationState>;

export interface HasStringID {
  id: string;
}

export interface HasNumericID {
  id: number;
}

export type Entity = HasStringID | HasNumericID;

export interface EntityError {
  read?: APIError[];
  create?: APIError[];
  delete?: APIError[];
  update?: APIError[];
}

export type EntityMap<T> = Record<string, T>;

export interface MappedEntityState<T extends Entity, E = EntityError> {
  error: E;
  lastUpdated: number;
  loading: boolean;
  itemsById: Record<string, T>;
  results: number;
}

export interface RequestableDataWithEntityError<D> {
  lastUpdated: number;
  loading: boolean;
  data?: D;
  results?: number;
  error: EntityError;
}

export type ThunkResult<T> = ThunkAction<
  T,
  ApplicationState,
  undefined,
  Action
>;

export type ThunkActionCreator<ReturnType, Params = void> = (
  args: Params,
  ...args2: any[]
) => ThunkResult<ReturnType>;

export type ThunkDispatch = _ThunkDispatch<ApplicationState, undefined, Action>;
