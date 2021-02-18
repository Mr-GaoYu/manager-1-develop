import { APIError, ResourcePage } from '@rua/api-v1/lib/types';
// import { clone } from 'ramda';
import React from 'react';
import { storage } from 'src/utilities/storage';

export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export type FilterParams = any;

export type PaginatedRequest<T = {}> = (
  ownProps?: any,
  p?: PaginationParams,
  f?: FilterParams
) => Promise<ResourcePage<T>>;

export type HandleOrderChange = (key: string, order?: Order) => void;

export type Order = 'asc' | 'desc';

export type OrderBy = undefined | string;

interface State<T = {}> {
  count: number;
  error?: APIError[];
  loading: boolean;
  isSorting?: boolean;
  page: number;
  pages?: number;
  pageSize: number;
  data?: T[];
  orderBy?: OrderBy;
  order: Order;
  filter: any;
  searching: boolean;
}

interface Options {
  orderBy?: OrderBy;
  order?: Order;
  cb?: (ownProps: any, response: ResourcePage<any>) => any;
}

const asc: 'asc' = 'asc';

export default (requestFn: PaginatedRequest, options: Options = {}) => (
  Component: React.ComponentType<any>
) => {
  return class WrappedComponent extends React.PureComponent<any, State> {
    state: State = {
      count: 0,
      loading: true,
      isSorting: false,
      page: 1,
      pageSize: storage.pageSize.get() || 25,
      error: undefined,
      orderBy: options.orderBy,
      order: options.order ?? asc,
      filter: {},
      searching: false
    };

    mounted: boolean = false;

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    // private request = (map?: Function) => {

    //   const filters = clone(this.state.filter);

    //   if (this.state.orderBy) {
    //     filters['+order_by'] = this.state.orderBy;
    //     filters['+order'] = this.state.order;
    //   }

    //   return requestFn(
    //     this.props,
    //     { page: this.state.page, page_size: this.state.pageSize },
    //     filters
    //   ).then(response => {
    //     if (options.cb) {
    //       options.cb(this.props, response);
    //     }

    //     if (this.mounted) {
    //       this.setState({
    //         count: response.results,
    //         page: response.page,
    //         pages: response.pages,
    //         data: map ? map(response.data) : response.data,
    //         loading: false,
    //         error: undefined,
    //         isSorting: false,
    //         searching: false
    //       });
    //     }
    //   })
    //     .catch(response => {
    //       this.setState({ loading: false, error: response });
    //     });
    // }
  };
};
