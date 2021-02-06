const PRODUCTION = 'production';

export const isProductionBuild = process.env.NODE_ENV === PRODUCTION;
export const APP_ROOT =
  process.env.REACT_APP_APP_ROOT || 'http://localhost:3000';
export const LOGIN_ROOT =
  process.env.REACT_APP_LOGIN_ROOT || 'https://login.rua.com';
export const API_ROOT =
  process.env.REACT_APP_API_ROOT || 'https://api.linode.com/v4';
export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
