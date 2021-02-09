import { API_ROOT } from 'src/constants';
import Request, {
  setMethod,
  setURL,
  setXFilter,
  setParams,
  setData
} from '../request';
import { ResourcePage as Page } from '../types';
import { Rua, CreateRuaRequest } from './types';

export const getRua = (ruaId: number) =>
  Request<Rua>(setURL(`${API_ROOT}/rua/instances/${ruaId}`), setMethod('GET'));

export const getRuaLishToken = (ruaId: number) =>
  Request<{ lish_token: string }>(
    setURL(`${API_ROOT}/rua/instances/${ruaId}/lish_token`),
    setMethod('POST')
  );

export const getRuaVolumnes = (
  ruaId: number,
  params: any = {},
  filter: any = {}
) =>
  Request<Page<Rua>>(
    setURL(`${API_ROOT}/rua/instances/${ruaId}/volumes`),
    setMethod('GET'),
    setXFilter(filter),
    setParams(params)
  );

export const getRuas = (params?: any, filter?: any) =>
  Request<Page<Rua>>(
    setURL(`${API_ROOT}/rua/instances/`),
    setMethod('GET'),
    setXFilter(filter),
    setParams(params)
  );

// export const createRua = (data: CreateRuaRequest) =>
// Request<Rua>(
//   setURL(`${API_ROOT}/linode/instances`),
//   setMethod('POST'),
//   setData(data, CreateLinodeSchema)
// );

export const deleteRua = (ruaId: number) =>
  Request<{}>(
    setURL(`${API_ROOT}/linode/instances/${ruaId}`),
    setMethod('DELETE')
  );
