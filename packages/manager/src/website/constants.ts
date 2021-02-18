const PRODUCTION = 'production';

export const isProductionBuild = process.env.NODE_ENV === PRODUCTION;
export const APP_ROOT =
  process.env.REACT_APP_APP_ROOT || 'http://localhost:3000';
export const LOGIN_ROOT =
  process.env.REACT_APP_LOGIN_ROOT || 'https://login.rua.com';
export const API_ROOT =
  process.env.REACT_APP_API_ROOT || 'https://api.linode.com/v4';
export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred.';

export const API_MAX_PAGE_SIZE =
  Number(process.env.REACT_APP_API_MAX_PAGE_SIZE) || 500;
export const LARGE_ACCOUNT_THRESHOLD = API_MAX_PAGE_SIZE;

export const INTERVAL = 1000;

export const DISABLE_EVENT_THROTTLE =
  Boolean(process.env.REACT_APP_DISABLE_EVENT_THROTTLE) || false;
