import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import domains, {
  State as DomainsState
} from 'src/store/domains/domains.reducer';
import authentication, {
  State as AuthState
} from 'src/store/authentication/authentication.reducer';
import accountManagement, {
  State as AccountManagementState
} from 'src/store/accountManagement/accountManagement.reducer';
import initialLoad, {
  State as InitialLoadState
} from 'src/store/initialLoad/initialLoad.reducer';

export interface ResourcesState {
  domains: DomainsState;
  accountManagement: AccountManagementState;
}

export interface ApplicationState {
  __resources: ResourcesState;
  authentication: AuthState;
  initialLoad: InitialLoadState;
}
/**
 *
 * Reducers
 */
const __resources = combineReducers({
  domains,
  accountManagement
});

const rootReducer = combineReducers<ApplicationState>({
  __resources,
  authentication,
  initialLoad
});

const middlewares = [...getDefaultMiddleware<ApplicationState>()];

export default configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV === 'development'
});
