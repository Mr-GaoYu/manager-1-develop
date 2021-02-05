import { MappedEntityState, Entity, EntityError } from 'src/store/types';
import { APIError } from '@rua/api-v1/lib/types';

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
