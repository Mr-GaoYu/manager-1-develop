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
// import { getAll, GetAllData } from 'src/utilities/getAll';
import { createRequestThunk } from 'src/store/store.helpers';
import { APIErrorConfig } from 'src/store/types';

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
  APIErrorConfig
>(`${DOMAINS}/create`, (payload) => createDomain(payload));

export const updateDomainActions = createRequestThunk<
  Domain,
  UpdateDomainParams,
  APIErrorConfig
>(`${DOMAINS}/update`, ({ domainId, ...payload }) =>
  updateDomain(domainId, payload)
);

export const deleteDomainActions = createRequestThunk<
  {},
  DomainId,
  APIErrorConfig
>(`${DOMAINS}/delete`, ({ domainId }) => deleteDomain(domainId));

export const getDomainActions = createRequestThunk<any, void, APIErrorConfig>(
  `${DOMAINS}/get-all`,
  () => {
    return;
  }
);

export const getDomainsPageActions = createRequestThunk<
  ResourcePage<Domain>,
  PageParams,
  APIErrorConfig
>(`${DOMAINS}/get-page`, ({ params, filters }) => getDomains(params, filters));
