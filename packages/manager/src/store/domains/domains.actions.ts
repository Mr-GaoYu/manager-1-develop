import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createDomain,
  CreateDomainPayload,
  deleteDomain,
  getDomains,
  updateDomain,
  UpdateDomainPayload,
  Domain
} from '@rua/api-v1/lib/domains';
import { APIError, ResourcePage } from '@rua/api-v1/lib/types';
import { getAll } from 'src/utilities/getAll';
import { createRequestThunk } from 'src/store/store.helpers';

export interface DomainId {
  domainId: number;
}

export interface PageParams {
  params?: any;
  filters?: any;
}

export type UpdateDomainParams = DomainId & UpdateDomainPayload;

const DOMAINS = `@@manager/domains`;

export const createDomainActions = createRequestThunk<
  Domain,
  CreateDomainPayload,
  APIError[]
>(`${DOMAINS}/create`, (payload) => createDomain(payload));

export const updateDomainActions = createAsyncThunk<Domain, UpdateDomainParams>(
  `${DOMAINS}/update`,
  ({ domainId, ...payload }) => updateDomain(domainId, payload)
);

export const deleteDomainActions = createAsyncThunk<{}, DomainId>(
  `${DOMAINS}/delete`,
  ({ domainId }) => deleteDomain(domainId)
);

export const getDomainActions = createAsyncThunk<any, void>(
  `${DOMAINS}/get-all`,
  (_, { rejectWithValue }) => {
    return getAll<Domain>(getDomains)({}, {})
      .then((domains) => {
        console.log('成功');
        return domains.data;
      })
      .catch((err) => {
        console.log(err, 'err');
        return rejectWithValue(err);
      });
  }
);

export const getDomainPageActions = createAsyncThunk<
  ResourcePage<Domain>,
  PageParams
>(`${DOMAINS}/get-page`, ({ params, filters }) => getDomains(params, filters));
