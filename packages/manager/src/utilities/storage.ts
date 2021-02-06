import { devToolsEnabled } from 'src/dev-tools/load';

const localStorageCache = {};

export const getStorage = (key: string, fallback?: any) => {
  if (localStorageCache[key]) {
    return localStorageCache[key];
  }

  const item = window.localStorage.getItem(key);

  if ((item === null || item === undefined) && !!fallback) {
    return fallback;
  }

  try {
    const parsedItem = JSON.parse(item as any);
    localStorageCache[key] = parsedItem;
    return parsedItem;
  } catch (e) {
    localStorageCache[key] = item;
    return item;
  }
};

export const setStorage = (key: string, value: string) => {
  try {
    localStorageCache[key] = JSON.parse(value);
  } catch {
    localStorageCache[key] = value;
  }
  return window.localStorage.setItem(key, value);
};

const DEV_TOOLS_ENV = 'devTools/env';
const TOKEN = 'authentication/token';
const NONCE = 'authentication/nonce';
const SCOPES = 'authentication/scopes';
const EXPIRE = 'authentication/expire';

export interface DevToolsEnv {
  apiRoot: string;
  loginRoot: string;
  clientID: string;
  label: string;
}

interface AuthGetAndSet {
  get: () => any;
  set: (value: string) => void;
}

export interface Storage {
  authentication: {
    token: AuthGetAndSet;
    nonce: AuthGetAndSet;
    scopes: AuthGetAndSet;
    expire: AuthGetAndSet;
  };
  devToolsEnv: {
    get: () => DevToolsEnv | null;
    set: (devToolsEnv: DevToolsEnv) => void;
  };
}

export const storage: Storage = {
  authentication: {
    token: {
      get: () => getStorage(TOKEN),
      set: (v) => setStorage(TOKEN, v)
    },
    nonce: {
      get: () => getStorage(NONCE),
      set: (v) => setStorage(NONCE, v)
    },
    scopes: {
      get: () => getStorage(SCOPES),
      set: (v) => setStorage(SCOPES, v)
    },
    expire: {
      get: () => getStorage(EXPIRE),
      set: (v) => setStorage(EXPIRE, v)
    }
  },
  devToolsEnv: {
    get: () => {
      const value = getStorage(DEV_TOOLS_ENV);
      return isDevToolsEnvValid(value) ? value : undefined;
    },
    set: (devToolsEnv) => setStorage(DEV_TOOLS_ENV, JSON.stringify(devToolsEnv))
  }
};

export const { authentication } = storage;

export const isDevToolsEnvValid = (value: any) => {
  return (
    typeof value?.apiRoot === 'string' &&
    typeof value?.loginRoot === 'string' &&
    typeof value?.clientID === 'string' &&
    typeof value?.label === 'string'
  );
};

export const getEnvLocalStorageOverrides = () => {
  if (devToolsEnabled() && process.env.NODE_ENV === 'development') {
    const localStorageOverrides = storage.devToolsEnv.get();
    if (localStorageOverrides) {
      return localStorageOverrides;
    }
  }

  return undefined;
};
