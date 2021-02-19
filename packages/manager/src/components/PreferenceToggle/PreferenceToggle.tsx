import React from 'react';
import { path } from 'ramda';

import { getStorage } from 'src/utilities/storage';

type PreferenceValue = boolean | string | number;

interface RenderChildrenProps {
  preference: PreferenceValue;
  togglePreference: () => PreferenceValue;
}

type RenderChildren = (props: RenderChildrenProps) => JSX.Element;

interface Props<T = PreferenceValue> {
  preferenceKey: string;
  preferenceOptions: [T, T];
  value?: T;
  toggleCallbackFn?: (value: T) => void;
  toggleCallbackFnDebounced?: (value: T) => void;
  initialSetCallbackFn?: (value: T) => void;
  localStorageKey?: string;
  children: RenderChildren;
}

type CombinedProps<T = PreferenceValue> = Props<T> & PreferenceProps;

export const PreferenceToggle: React.FC<CombinedProps> = (props) => {
  const {
    value,
    children,
    preferenceOptions,
    localStorageKey,
    preferenceKey
    // preferenceError,
    // toggleCallbackFnDebounced
  } = props;

  const [currentlySetPreference, setPreference] = React.useState<
    PreferenceValue | undefined
  >(value);

  const [lastUpdated] = React.useState<number>(0);

  React.useEffect(() => {
    let preferenceFromLocalStorage = '';

    try {
      /** 如果localstorge 中存在主题 */
      if (!!localStorageKey) {
        preferenceFromLocalStorage = getStorage(localStorageKey);
      }
    } catch (e) {
      /** do nothing */
    }

    if (
      isNullOrUndefined(currentlySetPreference) &&
      !!props.preferenceError &&
      lastUpdated === 0
    ) {
      const preferenceToSet = isNullOrUndefined(preferenceFromLocalStorage)
        ? preferenceOptions[0]
        : preferenceFromLocalStorage;
      setPreference(preferenceToSet);

      if (props.initialSetCallbackFn) {
        props.initialSetCallbackFn(preferenceToSet);
      }
    }

    if (
      isNullOrUndefined(currentlySetPreference) &&
      !!props.preferences &&
      lastUpdated === 0
    ) {
      const preferenceFromAPI = path<PreferenceValue>(
        [preferenceKey],
        props.preferences
      );

      const preferenceToSet = isNullOrUndefined(preferenceFromAPI)
        ? isNullOrUndefined(preferenceFromLocalStorage)
          ? preferenceOptions[0]
          : preferenceFromLocalStorage
        : preferenceFromAPI;

      setPreference(preferenceToSet);

      if (props.initialSetCallbackFn) {
        props.initialSetCallbackFn(preferenceToSet);
      }
    }
  }, [props.preferenceError, props.preferences]);

  React.useEffect(() => {
    if (!isNullOrUndefined(currentlySetPreference)) {
      const debouncedErrorUpdate = setTimeout(() => {
        // if (!!preferenceError && lastUpdated !== 0) {
        //   if (
        //     toggleCallbackFnDebounced &&
        //     !isNullOrUndefined(currentlySetPreference)
        //   ) {
        //     toggleCallbackFnDebounced(currentlySetPreference);
        //   }
        // }
      }, 500);

      return () => clearTimeout(debouncedErrorUpdate);
    }

    return () => null;
  }, [currentlySetPreference]);

  const togglePreference = () => {
    const newPreferenceToSet =
      currentlySetPreference === preferenceOptions[0]
        ? preferenceOptions[1]
        : preferenceOptions[0];

    setPreference(newPreferenceToSet);

    return newPreferenceToSet;
  };

  if (isNullOrUndefined(currentlySetPreference)) {
    return null;
  }

  return typeof children === 'function'
    ? children({ preference: currentlySetPreference, togglePreference })
    : null;
};

const isNullOrUndefined = (value: any): value is null | undefined => {
  return typeof value === 'undefined' || value === null;
};

export interface ToggleProps<T> {
  preference: T;
  togglePreference: () => T;
}

interface PreferenceProps {
  preferences?: Record<string, any>;
  preferenceError?: any;
  preferencesLastUpdated: number;
}
