import { MappedEntityState, Entity, EntityError } from 'src/store/types';
import { APIError } from '@rua/api-v1/lib/types';

export const onStart = <S>(state: S) =>
  Object.assign({}, state, { loading: true, error: { read: undefined } });

export const onError = <S = {}, E = APIError[] | undefined>(
  error: E,
  state: S
) => Object.assign({}, state, { error, loading: false });

export const createDefaultState = <E extends Entity, O extends EntityError>(
  override: Partial<MappedEntityState<E, O>> = {},
  defaultError: O = {} as O
): MappedEntityState<E, O> => ({
  itemsById: {},
  loading: false,
  lastUpdated: 0,
  error: defaultError as O,
  results: 0,
  ...override
});
