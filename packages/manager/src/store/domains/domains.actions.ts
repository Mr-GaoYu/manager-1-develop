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
import { ResourcePage } from '@rua/api-v1/lib/types';
import { GetAllData, getAll } from 'src/utilities/getAll';

export interface DomainId {
  domainId: number;
}

export interface PageParams {
  params?: any;
  filters?: any;
}

export type UpdateDomainParams = DomainId & UpdateDomainPayload;

const DOMAINS = `@@manager/domains`;

export const createDomainActions = createAsyncThunk<
  Domain,
  CreateDomainPayload
>(`${DOMAINS}/create`, (payload) => createDomain(payload));

export const updateDomainActions = createAsyncThunk<Domain, UpdateDomainParams>(
  `${DOMAINS}/update`,
  ({ domainId, ...payload }) => updateDomain(domainId, payload)
);

export const deleteDomainActions = createAsyncThunk<{}, DomainId>(
  `${DOMAINS}/delete`,
  ({ domainId }) => deleteDomain(domainId)
);

export const getDomainActions = createAsyncThunk<GetAllData<Domain>, void>(
  `${DOMAINS}/get-all`,
  () => getAll<Domain>(getDomains)({}, {})
);

export const getDomainPageActions = createAsyncThunk<
  ResourcePage<Domain>,
  PageParams
>(`${DOMAINS}/get-page`, ({ params, filters }) => getDomains(params, filters));
