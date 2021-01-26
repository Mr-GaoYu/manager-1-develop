import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

/**
 * Default State
 */
const __resourcesDefaultState = {};

export interface ResourcesState {}

export interface ApplicationState {
  __resources: ResourcesState;
}

export const defaultState: ApplicationState = {
  __resources: __resourcesDefaultState
};

/**
 *
 * Reducers
 */
const __resources = combineReducers({});

const reducers = combineReducers<ApplicationState>({
  __resources
});

const enhancers = compose(applyMiddleware());

export default createStore(reducers, defaultState, enhancers);
