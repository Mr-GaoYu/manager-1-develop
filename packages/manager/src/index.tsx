import React from 'react';
import ReactDOM from 'react-dom';
// import App from 'src/App';
import loadDevTools from 'src/dev-tools/load';
import 'src/index.css';
import { isProductionBuild } from 'src/website/constants';
import { Provider } from 'react-redux';
import store from 'src/store';
import {
  BrowserRouter,
  Route,
  // RouteComponentProps,
  Switch
} from 'react-router-dom';
import AuthenticationWrapper from 'src/components/AuthenticationWrapper';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from 'src/queries/base';

const renderNull = () => <span>null route</span>;

const renderNullAuth = () => <span>null auth route</span>;

const renderLish = () => <div>2</div>;

const renderApp = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools
      initialIsOpen={false}
      toggleButtonProps={{ style: { marginLeft: '3em' } }}
    />
  </QueryClientProvider>
);

const renderAuthentication = () => (
  <Switch>
    <Route exact path="/nullauth" render={renderNullAuth} />
    <AuthenticationWrapper>
      <Switch>
        <Route path="/ruas/:ruaId/lish" render={renderLish} />
        <Route render={renderApp} />
      </Switch>
    </AuthenticationWrapper>
  </Switch>
);

loadDevTools(() => {
  ReactDOM.render(
    navigator.cookieEnabled ? (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/null" render={renderNull} />
            <Route render={renderAuthentication} />
          </Switch>
        </BrowserRouter>
      </Provider>
    ) : (
      <div>2</div>
    ),
    document.getElementById('root') as HTMLElement
  );
});

if (module.hot && !isProductionBuild) {
  module.hot.accept();
}
