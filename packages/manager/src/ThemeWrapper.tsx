import React from 'react';
// import { dark, light } from 'src/themes';
// import { COMPACT_SPACING_UNIT, NORMAL_SPACING_UNIT } from 'src/themeFactory';
// import { ThemeProvider } from 'src/components/core/styles';

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

type CombinedProps = Props;

export const ThemeWrapper: React.FC<CombinedProps> = () => {
  return <div>2</div>;
};
