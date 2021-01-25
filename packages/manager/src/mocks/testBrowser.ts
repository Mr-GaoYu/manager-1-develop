import { setupWorker, SetupWorkerApi } from 'msw';
import { handlers, mockDataHandlers } from './serverHandlers';
import { isProductionBuild } from 'src/website/constants';
import { mockDataController } from 'src/dev-tools/mockDataController';

let worker: SetupWorkerApi;

if (!isProductionBuild) {
  worker = setupWorker(...handlers);

  mockDataController.subscribe((mockData) => {
    const mockHandlers = Object.keys(mockData).map((thisKey) => {
      const handlerGenerator = mockDataHandlers[thisKey];
      return handlerGenerator(mockData[thisKey].quantity);
    });

    worker.resetHandlers(...mockHandlers);
  });
}

export { worker };
