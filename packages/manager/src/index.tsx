import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loadDevTools from 'src/@rua/dev-tools/load';

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
  );
})
