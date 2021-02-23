import React from 'react';
import { ThemeProvider } from 'src/components/core/styles';
import { dark, light } from 'src/themes';
import { StoryContext, StoryGetter } from '@storybook/addons';
import CssBaseline from 'src/components/core/CssBaseline';
import 'src/index.css';
import 'src/storybook.css';

const options = {
  dark,
  light
};

const withThemeProvider = (Story: StoryGetter, context: StoryContext) => {
  const key = context.globals.theme || 'light';

  return (
    <ThemeProvider theme={options[key](8)}>
      <CssBaseline />

      <Story {...context} />
    </ThemeProvider>
  );
};

export default withThemeProvider;
