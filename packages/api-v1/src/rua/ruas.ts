import { API_ROOT } from 'src/constants';
import Request, { setMethod, setURL } from '../request';
import { Rua } from './types';

export const getRua = (ruaId: number) =>
  Request<Rua>(setURL(`${API_ROOT}/rua/instances/${ruaId}`), setMethod('GET'));
