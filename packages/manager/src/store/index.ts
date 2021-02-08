import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import domains, {
  defaultState as defaultDomainsState,
  State as DomainsState
} from 'src/store/domains/domains.reducer';
import authentication, {
  defaultState as authenticationDefaultState,
  State as AuthenticationState
} from 'src/store/authentication/authentication.reducer';
import accountManagement, {
  defaultState as defaultAccountManagementState,
  State as AccountManagementState
} from 'src/store/accountManagement/accountManagement.reducer';
import initialLoad, {
  defaultState as initialLoadState,
  State as InitialLoadState
} from 'src/store/initialLoad/initialLoad.reducer';
// import { getFirebase } from 'react-redux-firebase';

const __resourcesDefaultState = {
  domains: defaultDomainsState,
  accountManagement: defaultAccountManagementState
};
export interface ResourcesState {
  domains: DomainsState;
  accountManagement: AccountManagementState;
}

export interface ApplicationState {
  __resources: ResourcesState;
  authentication: AuthenticationState;
  initialLoad: InitialLoadState;
}

export const defaultState: ApplicationState = {
  __resources: __resourcesDefaultState,
  authentication: authenticationDefaultState,
  initialLoad: initialLoadState
};

/**
 *
 * Reducers
 */
const __resources = combineReducers({
  domains,
  accountManagement
});

const reducers = combineReducers<ApplicationState>({
  __resources,
  authentication,
  initialLoad
});

const enhancers = compose(applyMiddleware(thunk));

export default createStore(reducers, defaultState, enhancers);
