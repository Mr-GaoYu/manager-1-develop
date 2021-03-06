import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'src/components/core/Grid';
import { isProductionBuild } from 'src/website/constants';
import EnvironmentToggleTool from './EnvironmentToggleTool';
import MockDataTool from './MockDataTool';
import { Provider } from 'react-redux';
import store from 'src/store';
import './dev-tools.css';

const DevTools: React.FC<{}> = () => {
  return (
    <div id="dev-tools">
      <div>🛠</div>
      <Grid container spacing={2} className="tools">
        {process.env.NODE_ENV === 'development' && (
          <Grid item xs={4} sm={5} md={3}>
            <EnvironmentToggleTool />
          </Grid>
        )}
        {!isProductionBuild && (
          <Grid item xs={4} sm={5} md={3}>
            <MockDataTool />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export const install = () => {
  (window as Window).devToolsEnabled = true;
  const devToolsRoot = document.createElement('div');
  document.body.appendChild(devToolsRoot);
  ReactDOM.render(
    <Provider store={store}>
      <DevTools />
    </Provider>,
    devToolsRoot
  );
};
