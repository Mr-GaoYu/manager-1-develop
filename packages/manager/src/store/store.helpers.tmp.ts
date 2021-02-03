import { MappedEntityState, Entity, EntityError } from 'src/store/types';

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
