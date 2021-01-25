import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/App';
import loadDevTools from 'src/dev-tools/load';
import 'src/index.css';
import { isProductionBuild } from 'src/website/constants';
import { Provider } from 'react-redux';
import store from 'src/store';

loadDevTools(() => {
  ReactDOM.render(
    navigator.cookieEnabled ? (
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
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
