import { RuaType } from '@rua/api-v1/lib/rua';
import { APIError } from '@rua/api-v1/lib/types';

import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory(`@@manager/RuaType`);

export const getRuaTypesActions = actionCreator.async<
  void,
  RuaType[],
  APIError[]
>(`request`);

export interface GetRuaTypeParams {
  typeId: string;
  isShadowPlan?: boolean;
}
export const getRuaTypeActions = actionCreator.async<
  GetRuaTypeParams,
  RuaType,
  APIError[]
>(`request-one`);
