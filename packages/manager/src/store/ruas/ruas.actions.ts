import actionCreatorFactory from 'typescript-fsa';
import { Rua } from '@rua/api-v1/lib/rua';
import { GetAllData } from 'src/utilities/getAll';
import { APIError } from '@rua/api-v1/lib/types';

export const actionCreator = actionCreatorFactory(`@@manager/Ruas`);

export const updateMultipleRuas = actionCreator<Rua[]>('update_multiple');
export const upsertLinode = actionCreator<Rua>(`upsert`);
export const deleteLinode = actionCreator<number>('delete');

interface RuaID {
  ruaId: number;
}

export type GetRuaResponse = Promise<Rua>;
export type GetRuaRequest = (params: RuaID) => GetRuaResponse;

export const getLinodesActions = actionCreator.async<
  {
    params?: any;
    filter?: any;
  },
  GetAllData<Rua>,
  APIError[]
>('get-all');

export const getLinodeActions = actionCreator.async<RuaID, Rua, APIError[]>(
  'get-one'
);
