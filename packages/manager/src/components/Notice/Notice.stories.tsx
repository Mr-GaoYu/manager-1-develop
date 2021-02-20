import React from 'react';
import { Story, Meta } from '@storybook/react';
import Notice from './Notice';
import { Provider } from 'react-redux';
import store from 'src/store';

export default {
  title: 'All Notices',
  component: Notice
} as Meta;

const Template: Story<{}> = (args: any) => (
  <React.Fragment>
    <Provider store={store}>
      <div style={{ padding: 8, backgroundColor: '#f4f4f4' }}>
        <Notice error />
        <Notice success />
        <Notice warning />
      </div>
    </Provider>
  </React.Fragment>
);

export const Primary = Template.bind({});
