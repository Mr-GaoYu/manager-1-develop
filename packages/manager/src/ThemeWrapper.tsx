import React from 'react';
import { dark, light } from 'src/themes';
import { COMPACT_SPACING_UNIT, NORMAL_SPACING_UNIT } from 'src/themeFactory';
import { ThemeProvider } from 'src/components/core/styles';

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

type CombinedProps = Props;

export const ThemeWrapper: React.FC<CombinedProps> = () => {
  return <div>2</div>;
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
