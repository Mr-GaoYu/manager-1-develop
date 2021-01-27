// import { request } from 'http';
import { API_ROOT } from 'src/constants';
import Request, { setMethod, setParams, setURL } from 'src/request';
import { ResourcePage as Page } from 'src/types';
import { Domain } from './types';

export const getDomains = (params?: any) => {
  Request<Page<Domain>>(
    setURL(`${API_ROOT}/domains`),
    setMethod('GET'),
    setParams(params)
  );
};

export const getDomain = (domainId: number) =>
  Request<Domain>(setURL(`${API_ROOT}/domains/${domainId}`), setMethod('GET'));

export const deleteDomain = (domainId: number) =>
  Request<{}>(setURL(`${API_ROOT}/domains/${domainId}`), setMethod('DELETE'));
