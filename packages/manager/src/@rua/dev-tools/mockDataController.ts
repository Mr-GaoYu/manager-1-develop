import { Domain } from '@rua/api-v1/lib/domains/types';
import { v4 } from 'uuid';

export type MockDataType = 'domain';

export interface MockDataEntity<T> {
  mocked: boolean;
  quantity: number;
  template?: Partial<T>;
}

export interface MockData {
  domain?: MockDataEntity<Domain>;
}

export type SubscribeFunction = (mockData: MockData) => void;
export class MockDataController {
  subscribers: Record<string, SubscribeFunction>;
  mockData: MockData;

  constructor() {
    this.subscribers = {};
    this.mockData = {};
  }

  subscribe(fn: SubscribeFunction) {
    const id = v4();
    this.subscribers[id] = fn;
    return id;
  }

  unsubscribe(token: string) {
    delete this.subscribers[token];
  }

  updateMockData(newMockData: MockData) {
    this.mockData = { ...this.mockData, ...newMockData };
    this.notifySubscribers();
  }

  private notifySubscribers() {
    Object.values(this.subscribers).forEach((thisSubscriber) => {
      thisSubscriber(this.mockData);
    });
  }
}

export const mockDataController = new MockDataController();
