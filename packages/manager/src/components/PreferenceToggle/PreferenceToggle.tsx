import React from 'react';
import { path, equals } from 'ramda';
import { compose } from 'recompose';

import { getStorage } from 'src/utilities/storage';
import withPreferences, {
  PreferencesActionsProps
} from 'src/containers/preferences.container';

type PreferenceValue = boolean | string | number;

export interface ToggleProps<T> {
  preference: T;
  togglePreference: () => T;
}

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

type CombinedProps<T = PreferenceValue> = Props<T> &
  PreferenceProps &
  PreferencesActionsProps;

export const PreferenceToggle: React.FC<CombinedProps> = (props) => {
  const {
    value,
    preferenceError,
    preferenceKey,
    preferenceOptions,
    toggleCallbackFnDebounced,
    toggleCallbackFn,
    children,
    preferences,
    localStorageKey
  } = props;

  const [currentlySetPreference, setPreference] = React.useState<
    PreferenceValue | undefined
  >(value);

  const [lastUpdated, setLastUpdated] = React.useState<number>(0);

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
        if (!!preferenceError && lastUpdated !== 0) {
          if (
            toggleCallbackFnDebounced &&
            !isNullOrUndefined(currentlySetPreference)
          ) {
            toggleCallbackFnDebounced(currentlySetPreference);
          }

          props
            .getUserPreferences()
            .then((response) => {
              props
                .updateUserPreferences({
                  ...response,
                  [preferenceKey]: currentlySetPreference
                })
                .catch(() => /** swallow the error */ null);
            })
            .catch(() => /** swallow the error */ null);
        } else if (
          !!preferences &&
          !isNullOrUndefined(currentlySetPreference) &&
          lastUpdated !== 0
        ) {
          props
            .updateUserPreferences({
              ...props.preferences,
              [preferenceKey]: currentlySetPreference
            })
            .catch(() => /** swallow the error */ null);

          if (
            toggleCallbackFnDebounced &&
            !isNullOrUndefined(currentlySetPreference)
          ) {
            toggleCallbackFnDebounced(currentlySetPreference);
          }
        } else if (lastUpdated === 0) {
          setLastUpdated(Date.now());
        }
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

    if (toggleCallbackFn) {
      toggleCallbackFn(newPreferenceToSet);
    }

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

const wasUndefinedNowDefined = (prevProp: any, nextProp: any) => {
  return !prevProp && !!nextProp;
};

const wasDefinedNowUndefined = (prevProp: any, nextProp: any) => {
  return !!prevProp && !nextProp;
};

const isUpdatingForTheFirstTime = (
  prevLastUpdated: number,
  nextLastUpdated: number
) => {
  return prevLastUpdated === 0 && nextLastUpdated !== 0;
};

interface PreferenceProps {
  preferences?: Record<string, any>;
  preferenceError?: any;
  preferencesLastUpdated: number;
}

const memoized = (component: React.FC<CombinedProps>) =>
  React.memo(component, (prevProps, nextProps) => {
    const shouldRerender =
      !equals(prevProps.preferences, nextProps.preferences) ||
      wasUndefinedNowDefined(
        prevProps.preferenceError,
        nextProps.preferenceError
      ) ||
      wasDefinedNowUndefined(
        prevProps.preferenceError,
        nextProps.preferenceError
      ) ||
      !equals(prevProps.children, nextProps.children) ||
      isUpdatingForTheFirstTime(
        prevProps.preferencesLastUpdated,
        nextProps.preferencesLastUpdated
      );

    return !shouldRerender;
  });

export default (compose<CombinedProps, Props>(
  withPreferences<PreferenceProps, Props>(
    (ownProps, { data: preferences, error, lastUpdated }) => ({
      preferences,
      preferenceError: error,
      preferencesLastUpdated: lastUpdated
    })
  ),
  memoized
)(PreferenceToggle) as unknown) as <T>(props: Props<T>) => React.ReactElement;
