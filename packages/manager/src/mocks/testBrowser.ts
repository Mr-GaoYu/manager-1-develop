import { setupWorker, SetupWorkerApi } from 'msw';
import { handlers, mockDataHandlers } from './serverHandlers';
import { isProductionBuild } from 'src/website/constants';
import { MockData, mockDataController } from 'src/dev-tools/mockDataController';
import store, { ApplicationState } from 'src/store';

let worker: SetupWorkerApi;

if (!isProductionBuild) {
  worker = setupWorker(...handlers);

  mockDataController.subscribe((mockData) => {
    const mockHandlers = Object.keys(mockData).map((thisKey) => {
      const handlerGenerator = mockDataHandlers[thisKey];
      return handlerGenerator(mockData[thisKey].quantity);
    });

    worker.resetHandlers(...mockHandlers);

    requestEntities(mockData, store.getState());
  });
}

export { worker };

const requestEntities = (mockData: MockData, reduxState: ApplicationState) => {
  // if (mockData.domain && !reduxState.__resources.domains.loading) {
  //   store.dispatch(requestDomains() as any);
  // }
};
