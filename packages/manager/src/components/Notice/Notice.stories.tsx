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
        <Notice error text="This is an error notice" />
        <Notice success text="This is an important success notice" />
        <Notice warning text="This is an important warning notice" />
        <Notice error important text="This is an important error notice" />
        <Notice warning important text="This is an important warning notice" />
        <Notice success important text="This is an important success notice" />
        <Notice
          error
          notificationList
          text="This is an error notificationList notice"
        />
        <Notice
          warning
          text="This is a dismissible Notice"
          dismissible
          onClose={() => null}
        />
      </div>
    </Provider>
  </React.Fragment>
);

export const Primary = Template.bind({});
