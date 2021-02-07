import {
  createReducer,
  Reducer,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { Domain } from '@rua/api-v1/lib/domains';
import {
  getDomains,
  getDomainsPage,
  createDomain,
  updateDomain,
  deleteDomain
} from './domains.actions';
import {
  onStart,
  onError,
  onCreateOrUpdate,
  setError,
  createDefaultState,
  onGetAllSuccess,
  onDeleteSuccess,
  onGetPageSuccess
} from 'src/store/store.helpers.tmp';
import { MappedEntityState, EntityError } from 'src/store/types';

export type State = MappedEntityState<Domain, EntityError>;

export const initialState: State = createDefaultState({}, {});

const reducer: Reducer<State> = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<State>) =>
    builder
      .addCase(getDomainsPage.pending, (state) => {
        return setError({ read: undefined }, state);
      })
      .addCase(getDomainsPage.fulfilled, (state, actions) => {
        const { payload } = actions;
        return onGetPageSuccess(payload.data, state, payload.results);
      })
      .addCase(getDomainsPage.rejected, (state, actions) => {
        const { error } = actions;
        return onError({ read: error }, state);
      })
      .addCase(createDomain.pending, (state) => {
        return setError({ create: undefined }, state);
      })
      .addCase(createDomain.fulfilled, (state, actions) => {
        const { payload } = actions;
        return onCreateOrUpdate(payload, state);
      })
      .addCase(createDomain.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            create: error
          },
          state
        );
      })
      .addCase(updateDomain.pending, (state) => {
        return setError({ update: undefined }, state);
      })
      .addCase(updateDomain.fulfilled, (state, actions) => {
        const { payload } = actions;
        return onCreateOrUpdate(payload, state);
      })
      .addCase(updateDomain.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            update: error
          },
          state
        );
      })
      .addCase(deleteDomain.pending, (state) => {
        return setError({ delete: undefined }, state);
      })
      .addCase(deleteDomain.fulfilled, (state, actions) => {
        const { arg } = actions.meta;
        return onDeleteSuccess(arg.domainId, state);
      })
      .addCase(deleteDomain.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            delete: error
          },
          state
        );
      })
      .addCase(getDomains.pending, (state) => {
        return onStart(state);
      })
      .addCase(getDomains.fulfilled, (state, actions) => {
        const { payload } = actions;
        return onGetAllSuccess(payload.data, state, payload.results);
      })
      .addCase(getDomains.rejected, (state, actions) => {
        const { error } = actions;
        return onError(
          {
            read: error
          },
          state
        );
      })
);

export default reducer;
