import { APIError } from '@rua/api-v1/lib/types';

export interface HasStringID {
  id: string;
}

export interface HasNumericID {
  id: number;
}

export type Entity = HasStringID | HasNumericID;

export interface EntityError {
  read?: APIError[];
  create?: APIError[];
  delete?: APIError[];
  update?: APIError[];
}

export interface MappedEntityState<T extends Entity, E = EntityError> {
  error: E;
  lastUpdated: number;
  loading: boolean;
  itemsById: Record<string, T>;
  results: number;
}
