import { Domain } from '@rua/api-v1/lib/domains';
import { Reducer } from 'redux';
import { EntityError, MappedEntityState } from 'src/store/types';
import { createDefaultState } from 'src/store/store.helpers.tmp';

export type State = MappedEntityState<Domain, EntityError>;

export const defaultState: State = createDefaultState({}, {});

const reducer: Reducer<State> = (state = defaultState, action) => {
  return state;
};

export default reducer;
