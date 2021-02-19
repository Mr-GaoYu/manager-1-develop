import React from 'react';
import { dark, light } from 'src/themes';
import { COMPACT_SPACING_UNIT, NORMAL_SPACING_UNIT } from 'src/themeFactory';
import { ThemeProvider } from 'src/components/core/styles';
import { compose } from 'recompose';

import PreferenceToggle, { ToggleProps } from 'src/components/PreferenceToggle';
import withPreferences, {
  PreferencesActionsProps
} from 'src/containers/preferences.container';

export type ThemeChoice = 'light' | 'dark';
export type SpacingChoice = 'compact' | 'normal';

type RenderChildren = (
  toggle: () => void,
  spacing: () => void
) => React.ReactNode;

interface Props {
  children: RenderChildren | React.ReactNode;

  theme?: ThemeChoice;
  spacing?: SpacingChoice;
}

const themes = { light, dark };

type CombinedProps = Props & PreferencesActionsProps;

const setActiveHighlightTheme = (value: ThemeChoice) => {
  const inactiveTheme = value === 'dark' ? 'a11y-light' : 'a11y-dark';
  const links = document.querySelectorAll('style');

  links.forEach((thisLink: any) => {
    const content = thisLink?.textContent ?? '';

    thisLink.disabled = content.match(inactiveTheme);
  });
};

export const ThemeWrapper: React.FC<CombinedProps> = (props) => {
  const toggleTheme = (value: ThemeChoice) => {
    setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 500);
    setActiveHighlightTheme(value);
  };

  React.useEffect(() => {
    props.getUserPreferences().then((response) => {
      window.setTimeout(
        () => setActiveHighlightTheme(response?.theme ?? 'light'),
        1000
      );
    });
  }, []);

  const { children } = props;

  return (
    <PreferenceToggle<'light' | 'dark'>
      preferenceKey="theme"
      preferenceOptions={['light', 'dark']}
      toggleCallbackFnDebounced={toggleTheme}
      value={props.theme}
      localStorageKey="themeChoice">
      {({
        preference: themeChoice,
        togglePreference: _toggleTheme
      }: ToggleProps<ThemeChoice>) => (
        <PreferenceToggle<'normal' | 'compact'>
          preferenceKey="spacing"
          preferenceOptions={['normal', 'compact']}
          value={props.spacing}
          localStorageKey="spacingChoice">
          {({
            preference: spacingChoice,
            togglePreference: _toggleSpacing
          }: ToggleProps<SpacingChoice>) => (
            <MemoizedThemeProvider
              themeChoice={themeChoice}
              spacingChoice={spacingChoice}
              toggleTheme={_toggleTheme}
              toggleSpacing={_toggleSpacing}>
              {children}
            </MemoizedThemeProvider>
          )}
        </PreferenceToggle>
      )}
    </PreferenceToggle>
  );
};

interface MemoizedThemeProviderProps {
  themeChoice: ThemeChoice;
  spacingChoice: SpacingChoice;
  toggleTheme: () => ThemeChoice;
  toggleSpacing: () => SpacingChoice;
  children: RenderChildren | React.ReactNode;
}

export const MemoizedThemeProvider: React.FC<MemoizedThemeProviderProps> = (
  props
) => {
  const {
    themeChoice,
    toggleTheme,
    spacingChoice,
    toggleSpacing,
    children
  } = props;

  const theme = React.useMemo(() => {
    const themeCreator = safelyGetTheme(themes, themeChoice);

    const spacingUnit =
      spacingChoice === 'compact' ? COMPACT_SPACING_UNIT : NORMAL_SPACING_UNIT;

    return themeCreator(spacingUnit);
  }, [themeChoice, spacingChoice]);

  return (
    <ThemeProvider theme={theme}>
      {typeof children === 'function'
        ? (children as RenderChildren)(toggleTheme, toggleSpacing)
        : children}
    </ThemeProvider>
  );
};

/** 默认选择 light  主题 */
const safelyGetTheme = (
  themesToChoose: Record<'dark' | 'light', any>,
  themeChoice: string
) => {
  return !!Object.keys(themesToChoose).some(
    (eachTheme) => eachTheme === themeChoice
  )
    ? themesToChoose[themeChoice]
    : themesToChoose['light'];
};

export default compose<CombinedProps, Props>(withPreferences())(ThemeWrapper);
