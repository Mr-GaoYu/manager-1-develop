import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import domains, {
  State as DomainsState
} from 'src/store/domains/domains.reducer';

export interface ResourcesState {
  domains: DomainsState;
}

export interface ApplicationState {
  __resources: ResourcesState;
}
/**
 *
 * Reducers
 */
const __resources = combineReducers({
  domains
});

const rootReducer = combineReducers<ApplicationState>({
  __resources
});

const middlewares = [...getDefaultMiddleware<ApplicationState>()];

export default configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV === 'development'
});
