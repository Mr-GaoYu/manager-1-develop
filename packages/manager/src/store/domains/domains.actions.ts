import {
  CreateDomainPayload,
  Domain,
  UpdateDomainPayload
} from '@rua/api-v1/lib/domains';
import { APIError, ResourcePage } from '@rua/api-v1/lib/types';
import actionCreatorFactory from 'typescript-fsa';

export interface DomainId {
  domainId: number;
}

export type UpdateDomainParams = DomainId & UpdateDomainPayload;

const actionCreator = actionCreatorFactory(`@@manager/domains`);

export const deleteDomain = actionCreator<number>('delete');

export const createDomainActions = actionCreator.async<
  CreateDomainPayload,
  Domain,
  APIError[]
>('create');
export const updateDomainActions = actionCreator.async<
  UpdateDomainParams,
  Domain,
  APIError[]
>('update');
export const deleteDomainActions = actionCreator.async<
  DomainId,
  {},
  APIError[]
>('delete');
export interface PageParams {
  params?: any;
  filters?: any;
}
export const getDomainsPageActions = actionCreator.async<
  PageParams,
  ResourcePage<Domain>,
  APIError[]
>('get-page');
