import { Domain } from '@rua/api-v1/lib/domains';
import { Reducer } from 'redux';
import { EntityError, MappedEntityState } from 'src/store/types';
import {
  createDefaultState,
  onCreateOrUpdate,
  onDeleteSuccess,
  onError,
  onGetAllSuccess,
  onGetPageSuccess,
  onStart,
  setError
} from '../store.helpers.tmp';
import {
  createDomainActions,
  deleteDomain,
  deleteDomainActions,
  getDomainsActions,
  getDomainsPageActions,
  updateDomainActions
} from './domains.actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export type State = MappedEntityState<Domain, EntityError>;

export const defaultState: State = createDefaultState({}, {});

const reducer: Reducer<State> = reducerWithInitialState(defaultState)
  .case(getDomainsActions.started, (state) => {
    return onStart(state);
  })
  .caseWithAction(getDomainsActions.done, (state, { payload: { result } }) => {
    return onGetAllSuccess(result.data, state, result.results);
  })
  .caseWithAction(getDomainsActions.failed, (state, { payload: { error } }) => {
    return onError(
      {
        read: error
      },
      state
    );
  })
  .caseWithAction(deleteDomain, (state, { payload }) => {
    return onDeleteSuccess(payload, state);
  })
  .case(createDomainActions.started, (state) => {
    return setError({ create: undefined }, state);
  })
  .caseWithAction(
    createDomainActions.done,
    (state, { payload: { result } }) => {
      return onCreateOrUpdate(result, state);
    }
  )
  .caseWithAction(
    createDomainActions.failed,
    (state, { payload: { error } }) => {
      return onError(
        {
          create: error
        },
        state
      );
    }
  )
  .case(updateDomainActions.started, (state) => {
    return setError({ update: undefined }, state);
  })
  .caseWithAction(
    updateDomainActions.done,
    (state, { payload: { result } }) => {
      return onCreateOrUpdate(result, state);
    }
  )
  .caseWithAction(
    updateDomainActions.failed,
    (state, { payload: { error } }) => {
      return onError(
        {
          update: error
        },
        state
      );
    }
  )
  .case(deleteDomainActions.started, (state) => {
    return setError({ delete: undefined }, state);
  })
  .caseWithAction(
    deleteDomainActions.done,
    (state, { payload: { params } }) => {
      return onDeleteSuccess(params.domainId, state);
    }
  )
  .caseWithAction(
    deleteDomainActions.failed,
    (state, { payload: { error } }) => {
      return onError(
        {
          delete: error
        },
        state
      );
    }
  )
  .case(getDomainsPageActions.started, (state) => {
    return setError({ read: undefined }, state);
  })
  .caseWithAction(
    getDomainsPageActions.done,
    (state, { payload: { result } }) => {
      return onGetPageSuccess(result.data, state, result.results);
    }
  )
  .caseWithAction(
    getDomainsPageActions.failed,
    (state, { payload: { error } }) => {
      return onError(
        {
          read: error
        },
        state
      );
    }
  )
  .default((state) => state);

export default reducer;
