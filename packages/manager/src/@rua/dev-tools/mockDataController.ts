export type MockDataType = 'linode' | 'nodeBalancer' | 'domain' | 'volume';

export interface MockDataEntity<T> {
  mocked: boolean;
  quantity: number;
  template?: Partial<T>;
}
