import Axios, { AxiosRequestConfig } from 'axios';
import { APIError } from './types';

export interface RequestConfig extends AxiosRequestConfig {
  validationErrors?: APIError[];
}

export type ConfigField = 'headers' | 'data' | 'params' | 'method' | 'url';

export type MethodField = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const baseRequest = Axios.create({
  baseURL: 'https://rua.com/v1'
});

export const setToken = (token: string) => {
  return baseRequest.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    };
  });
};

const set = (field: ConfigField, value: any) => (object: any) => {
  return !isEmpty(value) ? { ...object, [field]: value } : object;
};

export const isEmpty = (v: any) =>
  v === undefined ||
  v === null ||
  v.length === 0 ||
  (typeof v === 'object' &&
    Object.keys(v).length === 0 &&
    v.constructor === Object);

export const setURL = (url: string) => set('url', url);

export const setMethod = (method: MethodField) => set('method', method);

export const setParams = (params: any = {}) => set('params', params);

export const setHeaders = (newHeaders: any = {}) => (object: any) => {
  return !isEmpty(newHeaders)
    ? {
        ...object,
        headers: {
          ...object.headers,
          ...newHeaders
        }
      }
    : object;
};
