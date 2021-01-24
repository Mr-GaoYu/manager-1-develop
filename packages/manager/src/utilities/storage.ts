// import { devToolsEnabled } from 'src/@rua/dev-tools/load';

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
}

export const setStorage = (key: string, value: string) => {
  try {
    localStorageCache[key] = JSON.parse(value);
  } catch {
    localStorageCache[key] = value;
  }
  return window.localStorage.setItem(key, value);
};

const DEV_TOOLS_ENV = 'devTools/env';

export interface DevToolsEnv {
  apiRoot: string;
  loginRoot: string;
  clientID: string;
  label: string;
}

export interface Storage {
  devToolsEnv: {
    get: () => DevToolsEnv | null;
    set: (devToolsEnv: DevToolsEnv) => void;
  };
}

export const storage: Storage = {
  devToolsEnv: {
    get: () => {
      const value = getStorage(DEV_TOOLS_ENV);
      return isDevToolsEnvValid(value) ? value : undefined;
    },
    set: devToolsEnv => setStorage(DEV_TOOLS_ENV, JSON.stringify(devToolsEnv))
  }
}

export const isDevToolsEnvValid = (value: any) => {
  return (
    typeof value?.apiRoot === 'string' &&
    typeof value?.loginRoot === 'string' &&
    typeof value?.clientID === 'string' &&
    typeof value?.label === 'string'
  );
};