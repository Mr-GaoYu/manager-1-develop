import { RuaType } from '@rua/api-v1/lib/rua';
import { Reducer } from 'redux';
import { EntityState } from 'src/store/types';
import { isType } from 'typescript-fsa';
import { getRuaTypesActions, getRuaTypeActions } from './ruaType.actions';

export interface ExtendedType extends RuaType {
  heading: string;
  isDeprecated: boolean;
  isShadowPlan?: boolean;
}

export type State = EntityState<ExtendedType>;

export const defaultState: State = {
  entities: [],
  results: [],
  error: undefined,
  loading: false,
  lastUpdated: 0
};

const reducer: Reducer<State> = (state = defaultState, action) => {
  if (isType(action, getRuaTypesActions.started)) {
    return {
      ...state,
      loading: true
    };
  }

  if (isType(action, getRuaTypesActions.done)) {
    const { result } = action.payload;

    const extendedTypes = result.map(extendType);

    return {
      ...state,
      loading: false,
      lastUpdated: Date.now(),
      entities: extendedTypes,
      results: extendedTypes.map((t) => t.id)
    };
  }

  if (isType(action, getRuaTypesActions.failed)) {
    const { error } = action.payload;

    return {
      ...state,
      loading: false,
      error
    };
  }

  if (isType(action, getRuaTypeActions.done)) {
    const { result } = action.payload;

    if (state.results.includes(result.id)) {
      return state;
    }

    const extendedType = extendType(result);

    if (action.payload.params.isShadowPlan) {
      extendedType.isShadowPlan = true;
    }

    return {
      ...state,
      entities: [...state.entities, extendedType],
      results: [...state.results, extendedType.id]
    };
  }

  return state;
};

export default reducer;

export const extendType = (type: RuaType): ExtendedType => {
  const { label } = type;
  return {
    ...type,
    heading: label,
    isDeprecated: type.successor !== null
  };
};
