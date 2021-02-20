import ThemeDecorator from '../src/utilities/storybookDecorators';
import StoryRouter from 'storybook-react-router';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'globe',
      items: ['light', 'dark']
    }
  }
};

export const decorators = [StoryRouter(), ThemeDecorator];
