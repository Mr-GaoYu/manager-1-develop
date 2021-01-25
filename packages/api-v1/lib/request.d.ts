import { AxiosRequestConfig } from 'axios';
import { APIError } from './types';
export interface RequestConfig extends AxiosRequestConfig {
  validationErrors?: APIError[];
}
export declare type ConfigField =
  | 'headers'
  | 'data'
  | 'params'
  | 'method'
  | 'url';
export declare type MethodField = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare const baseRequest: import('axios').AxiosInstance;
export declare const setToken: (token: string) => number;
export declare const isEmpty: (v: any) => boolean;
export declare const setURL: (url: string) => (object: any) => any;
export declare const setMethod: (method: MethodField) => (object: any) => any;
export declare const setParams: (params?: any) => (object: any) => any;
export declare const setHeaders: (newHeaders?: any) => (object: any) => any;
