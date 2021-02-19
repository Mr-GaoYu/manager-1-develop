import { APIError, ResourcePage } from '@rua/api-v1/lib/types';
import React from 'react';
import { storage } from 'src/utilities/storage';
import { clone } from 'ramda';

export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export type FilterParams = any;

export type Order = 'asc' | 'desc';

export type OrderBy = undefined | string;

export type PaginationRequest<T = {}> = (
  ownProps?: any,
  p?: PaginationParams,
  f?: FilterParams
) => Promise<ResourcePage<T>>;

interface Options {
  orderBy?: OrderBy;
  order?: Order;
  cb?: (ownProps: any, response: ResourcePage<any>) => any;
}

export type HandleOrderChange = (key: string, order?: Order) => void;

export interface PaginationProps<T> extends State<T> {
  handlePageChange: (v: number, showSpinner?: boolean) => void;
  handlePageSizeChange: (v: number) => void;
  request: <U = {}>(update?: (v: T[]) => U) => Promise<void>;
  handleOrderChange: HandleOrderChange;
  handleSearch: (newFilter: any) => void;
  onDelete: () => void;
}

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

const asc: 'asc' = 'asc';

export default (requestFn: PaginationRequest, options: Options = {}) => (
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

    private onDelete = () => {
      const { page, data } = this.state;

      if (data && data.length === 1) {
        return this.handlePageChange(page - 1);
      }

      return this.request();
    };

    private request = (map?: Function) => {
      const filters = clone(this.state.filter);

      if (this.state.orderBy) {
        filters['+order_by'] = this.state.orderBy;
        filters['+order'] = this.state.order;
      }

      return requestFn(
        this.props,
        { page: this.state.page, page_size: this.state.pageSize },
        filters
      )
        .then((response) => {
          if (options.cb) {
            options.cb(this.props, response);
          }

          if (this.mounted) {
            this.setState({
              count: response.results,
              page: response.page,
              pages: response.pages,
              data: map ? map(response.data) : response.data,
              loading: false,
              error: undefined,
              isSorting: false,
              searching: false
            });
          }
        })
        .catch((response) => {
          this.setState({ loading: false, error: response });
        });
    };

    public handlePageSizeChange = (pageSize: number) => {
      this.setState({ pageSize, page: 1 }, () => {
        this.request();
      });
      storage.pageSize.set(pageSize);
    };

    public handlePageChange = (page: number) => {
      this.setState({ page }, () => {
        this.request();
      });
    };

    public handleOrderChange = (
      orderBy: string,
      order: Order = 'asc',
      page: number = 1
    ) => {
      this.setState({ orderBy, order, page, isSorting: true }, () =>
        this.request()
      );
    };

    public handleSearch = (filter: any) => {
      this.setState({ filter, page: 1, searching: true }, () => this.request());
    };

    public render() {
      return React.createElement(Component, {
        ...this.props,
        ...this.state,
        handlePageChange: this.handlePageChange,
        handlePageSizeChange: this.handlePageSizeChange,
        request: this.request,
        handleOrderChange: this.handleOrderChange,
        handleSearch: this.handleSearch,
        onDelete: this.onDelete
      });
    }
  };
};
