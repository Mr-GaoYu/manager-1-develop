import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import domains, {
  State as DomainsState
} from 'src/store/domains/domains.reducer';
import authentication, {
  State as AuthState
} from 'src/store/authentication/authentication.reducer';

export interface ResourcesState {
  domains: DomainsState;
}

export interface ApplicationState {
  __resources: ResourcesState;
  authentication: AuthState;
}
/**
 *
 * Reducers
 */
const __resources = combineReducers({
  domains
});

const rootReducer = combineReducers<ApplicationState>({
  __resources,
  authentication
});

const middlewares = [...getDefaultMiddleware<ApplicationState>()];

export default configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV === 'development'
});
