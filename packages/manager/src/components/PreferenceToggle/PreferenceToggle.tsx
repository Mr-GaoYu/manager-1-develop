import React from 'react';

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
  children: RenderChildren;
}

type CombinedProps<T = PreferenceValue> = Props<T> & PreferenceProps;

export const PreferenceToggle: React.FC<CombinedProps> = (props) => {
  const { value, children, preferenceOptions } = props;

  const [currentlySetPreference, setPreference] = React.useState<
    PreferenceValue | undefined
  >(value);
  // const [lastUpdated, setLastUpdated] = React.useState<number>(0);

  const togglePreference = () => {
    const newPreferenceToSet =
      currentlySetPreference === preferenceOptions[0]
        ? preferenceOptions[1]
        : preferenceOptions[0];

    setPreference(newPreferenceToSet);

    return newPreferenceToSet;
  };

  return typeof children === 'function'
    ? children({ preference: currentlySetPreference, togglePreference })
    : null;
};

interface PreferenceProps {
  preferences?: Record<string, any>;
  preferenceError?: any;
  preferencesLastUpdated: number;
}
