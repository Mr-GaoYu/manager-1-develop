import { MappedEntityState, Entity, EntityError } from 'src/store/types';
import { APIError } from '@rua/api-v1/lib/types';
import { omit } from 'ramda';

export const onStart = <S>(state: S) =>
  Object.assign({}, state, { loading: true, error: { read: undefined } });

export const onError = <S = {}, E = APIError[] | undefined>(
  error: E,
  state: S
) => Object.assign({}, state, { error, loading: false });

export const setError = <E extends Entity>(
  error: EntityError,
  state: MappedEntityState<E, EntityError>
) => {
  return Object.assign({}, state, { error: { ...state.error, ...error } });
};

export const onCreateOrUpdate = <E extends Entity, O = APIError[] | undefined>(
  entity: E,
  state: MappedEntityState<E, O>
): MappedEntityState<E, O> => addMany([entity], state);

export const addMany = <E extends Entity, O = APIError[] | undefined>(
  list: E[],
  state: MappedEntityState<E, O>,
  results?: number
): MappedEntityState<E, O> => {
  const itemsById = list.reduce(
    (map, item) => ({ ...map, [item.id]: item }),
    state.itemsById
  );

  return {
    ...state,
    itemsById,
    results: results ?? Object.keys(itemsById).length
  };
};

export const onDeleteSuccess = <E extends Entity, O = APIError[] | undefined>(
  id: string | number,
  state: MappedEntityState<E, O>
): MappedEntityState<E, O> => removeMany([String(id)], state);

export const removeMany = <E extends Entity, O = APIError[] | undefined>(
  list: string[],
  state: MappedEntityState<E, O>
): MappedEntityState<E, O> => {
  const itemsById = omit(list, state.itemsById);

  return {
    ...state,
    itemsById,
    results: Object.keys(itemsById).length
  };
};

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
