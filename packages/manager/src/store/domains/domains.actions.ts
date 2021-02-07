import {
  createDomain as _createDomain,
  CreateDomainPayload,
  deleteDomain as _deleteDomain,
  getDomains as _getDomains,
  updateDomain as _updateDomain,
  UpdateDomainPayload,
  Domain
} from '@rua/api-v1/lib/domains';
import { ResourcePage } from '@rua/api-v1/lib/types';
import { getAll, GetAllData } from 'src/utilities/getAll';
import { createRequestThunk } from 'src/store/store.helpers';
import { AsyncThunkConfig } from 'src/store/types';
import { getAPIErrorOrDefault } from 'src/utilities/errorUtils';

export interface DomainId {
  domainId: number;
}

export interface PageParams {
  params?: any;
  filters?: any;
}

export type UpdateDomainParams = DomainId & UpdateDomainPayload;

const DOMAINS = `@@manager/Domains`;

export const createDomain = createRequestThunk<
  Domain,
  CreateDomainPayload,
  AsyncThunkConfig
>(`${DOMAINS}/create`, (payload) => _createDomain(payload));

export const updateDomain = createRequestThunk<
  Domain,
  UpdateDomainParams,
  AsyncThunkConfig
>(`${DOMAINS}/update`, ({ domainId, ...payload }) =>
  _updateDomain(domainId, payload)
);

export const deleteDomain = createRequestThunk<{}, DomainId, AsyncThunkConfig>(
  `${DOMAINS}/delete`,
  ({ domainId }) => _deleteDomain(domainId)
);

export const getDomains = createRequestThunk<
  GetAllData<Domain>,
  void,
  AsyncThunkConfig
>(`${DOMAINS}/get-all`, () =>
  getAll<Domain>(_getDomains)().catch((err) => {
    const errors = getAPIErrorOrDefault(
      err,
      'There was an error retrieving your Domains.'
    );
    return Promise.reject(errors);
  })
);

export const getDomainsPage = createRequestThunk<
  ResourcePage<Domain>,
  PageParams,
  AsyncThunkConfig
>(`${DOMAINS}/get-page`, ({ params, filters }) => _getDomains(params, filters));
