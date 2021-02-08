import { createRequestThunk } from 'src/store/store.helpers';
import {
  createDomainActions,
  deleteDomainActions,
  updateDomainActions,
  UpdateDomainParams,
  getDomainsPageActions,
  getDomainsActions,
  DomainId,
  PageParams
} from './domains.actions';
import {
  createDomain as _createDomain,
  CreateDomainPayload,
  deleteDomain as _deleteDomain,
  Domain,
  getDomains,
  updateDomain as _updateDomain
} from '@rua/api-v1/lib/domains';
import { APIError, ResourcePage } from '@rua/api-v1/lib/types';
import { ThunkActionCreator } from 'src/store/types';
import { getAll } from 'src/utilities/getAll';
import { getAPIErrorOrDefault } from 'src/utilities/errorUtils';

export const createDomain = createRequestThunk<
  Domain,
  CreateDomainPayload,
  APIError[]
>(createDomainActions, (payload) => _createDomain(payload));

export const deleteDomain = createRequestThunk<{}, DomainId, APIError[]>(
  deleteDomainActions,
  ({ domainId }) => _deleteDomain(domainId)
);

export const updateDomain = createRequestThunk<
  Domain,
  UpdateDomainParams,
  APIError[]
>(updateDomainActions, ({ domainId, ...payload }) =>
  _updateDomain(domainId, payload)
);

export const getDomainsPage = createRequestThunk<
  ResourcePage<Domain>,
  PageParams,
  APIError[]
>(getDomainsPageActions, ({ params, filters }) => getDomains(params, filters));

export const requestDomains: ThunkActionCreator<Promise<Domain[]>> = () => (
  dispatch
) => {
  dispatch(getDomainsActions.started());

  return getAll<Domain>(getDomains)()
    .then((domains) => {
      dispatch(getDomainsActions.done({ result: domains }));
      return domains.data;
    })
    .catch((error) => {
      const errors = getAPIErrorOrDefault(
        error,
        'There was an error retrieving your Domains.'
      );
      dispatch(getDomainsActions.failed({ error: errors }));
      return error;
    });
};
