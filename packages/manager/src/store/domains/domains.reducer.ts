import {
  // EntityState,
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { Domain } from '@rua/api-v1/lib/domains';
import {
  getDomainsPageActions,
  createDomainActions,
  updateDomainActions,
  deleteDomainActions
  // onDeleteSuccess
} from './domains.actions';
import {
  // onStart,
  onError,
  onCreateOrUpdate,
  setError,
  createDefaultState
} from 'src/store/store.helpers.tmp';
import { MappedEntityState, EntityError } from 'src/store/types';

export type State = MappedEntityState<Domain, EntityError>;

export const initialState: State = createDefaultState({}, {});

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder
      .addCase(getDomainsPageActions.pending, (state) => {
        return setError({ read: undefined }, state);
      })
      .addCase(getDomainsPageActions.fulfilled, (state, actions) => {
        console.log(actions.payload, 222222222);
        return { ...state, isFetching: true };
      })
      .addCase(getDomainsPageActions.rejected, (state, actions) => {
        const { error } = actions;
        return onError({ read: error }, state);
      })
      .addCase(createDomainActions.pending, (state) => {
        return setError({ create: undefined }, state);
      })
      .addCase(createDomainActions.fulfilled, (state, actions) => {
        const { payload } = actions;
        return onCreateOrUpdate(payload, state);
      })
      .addCase(createDomainActions.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            create: error
          },
          state
        );
      })
      .addCase(updateDomainActions.pending, (state) => {
        return setError({ update: undefined }, state);
      })
      .addCase(updateDomainActions.fulfilled, (state, actions) => {
        const { payload } = actions;
        return onCreateOrUpdate(payload, state);
      })
      .addCase(updateDomainActions.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            update: error
          },
          state
        );
      })
      .addCase(deleteDomainActions.pending, (state) => {
        return setError({ delete: undefined }, state);
      })
      .addCase(deleteDomainActions.fulfilled, () => {
        // const { payload } = actions;
        // return onDeleteSuccess(payload.domainId, state);
      })
      .addCase(deleteDomainActions.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            delete: error
          },
          state
        );
      })
);

export default reducer;
