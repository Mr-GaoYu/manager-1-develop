import { API_MAX_PAGE_SIZE } from 'src/constants';
import { range } from 'ramda';
export interface APIResponsePage<T> {
  page: number;
  pages: number;
  data: T;
  results: number;
}

export type GetFunction = (
  params?: any,
  filters?: any
) => Promise<APIResponsePage<any>>;
export interface GetAllData<T> {
  data: T[];
  results: number;
}

export const getAll: <T>(
  getter: GetFunction,
  pageSize?: number,
  cb?: any
) => (params?: any, filter?: any) => Promise<GetAllData<T>> = (
  getter,
  pageSize = API_MAX_PAGE_SIZE,
  cb
) => (params?: any, filter?: any) => {
  const pagination = { ...params, page_size: pageSize };

  return getter(pagination, filter).then(
    ({ data: firstPageData, page, pages, results }) => {
      if (page === pages) {
        return {
          data: firstPageData,
          results
        };
      }

      if (cb) {
        cb(results);
      }

      const remainingPages = range(page + 1, pages + 1);

      const promises: Promise<any>[] = [];
      remainingPages.forEach((thisPage) => {
        const promise = getter({ ...pagination, page: thisPage }, filter).then(
          (response) => response.data
        );
        promises.push(promise);
      });

      return Promise.all(promises).then((resultPages) => {
        const combinedData = resultPages.reduce((result, nextPage) => {
          return [...result, ...nextPage];
        }, firstPageData);
        return {
          data: combinedData,
          results
        };
      });
    }
  );
};
