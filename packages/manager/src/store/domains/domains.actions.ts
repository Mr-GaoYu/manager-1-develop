import {
  CreateDomainPayload,
  UpdateDomainPayload,
  Domain
} from '@rua/api-v1/lib/domains';
import actionCreatorFactory from 'typescript-fsa';
import { APIError } from '@rua/api-v1/lib/types';
import { ResourcePage } from '@rua/api-v1/lib/types';
import { GetAllData } from 'src/utilities/getAll';

export interface DomainId {
  domainId: number;
}

export type UpdateDomainParams = DomainId & UpdateDomainPayload;

const actionCreator = actionCreatorFactory(`@@manager/Domains`);

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

export const getDomainsActions = actionCreator.async<
  void,
  GetAllData<Domain>,
  APIError[]
>('get-all');

export interface PageParams {
  params?: any;
  filters?: any;
}
export const getDomainsPageActions = actionCreator.async<
  PageParams,
  ResourcePage<Domain>,
  APIError[]
>('get-page');
