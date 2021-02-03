import { API_ROOT } from 'src/constants';
import Request, { setMethod, setParams, setURL, setData } from 'src/request';
import { ResourcePage as Page } from 'src/types';
import { Domain, CreateDomainPayload, UpdateDomainPayload } from './types';
import { createDomainSchema, updateDomainSchema } from './domains.schema';

export const getDomains = (params?: any, filters?: any) =>
  Request<Page<Domain>>(
    setURL(`${API_ROOT}/domains`),
    setMethod('GET'),
    setParams(params)
  );

export const getDomain = (domainId: number) =>
  Request<Domain>(setURL(`${API_ROOT}/domains/${domainId}`), setMethod('GET'));

export const createDomain = (data: CreateDomainPayload) =>
  Request<Domain>(
    setData(data, createDomainSchema),
    setURL(`${API_ROOT}/domains`),
    setMethod('POST')
  );

export const updateDomain = (domainId: number, data: UpdateDomainPayload) =>
  Request<Domain>(
    setURL(`${API_ROOT}/domains/${domainId}`),
    setMethod('PUT'),
    setData(data, updateDomainSchema)
  );

export const deleteDomain = (domainId: number) =>
  Request<{}>(setURL(`${API_ROOT}/domains/${domainId}`), setMethod('DELETE'));
