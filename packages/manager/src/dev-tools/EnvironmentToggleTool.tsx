import React from 'react';
import Grid from 'src/components/core/Grid';
import { storage } from 'src/utilities/storage';

export interface EnvironmentOption {
  label: string;
  apiRoot: string;
  loginRoot: string;
  clientID: string;
}

/**
 * REACT_APP_DEV_TOOLS_ENV_1_LABEL = "Another environment"
 * @param env
 */
export const getOptions = (env: typeof process.env) => {
  const envVariables = Object.keys(env);

  return envVariables.reduce<EnvironmentOption[]>((result, thisEnvVariable) => {
    const parsed = /REACT_APP_DEV_TOOLS_ENV_(.)_LABEL/.exec(thisEnvVariable);
    if (!parsed) {
      return result;
    }

    const num = parsed[1];
    const base = `REACT_APP_DEV_TOOLS_ENV_${num}`;

    return [
      ...result,
      {
        label: env[thisEnvVariable] ?? '',
        apiRoot: env[`${base}_API_ROOT`] ?? '',
        loginRoot: env[`${base}_LOGIN_ROOT`] ?? '',
        clientID: env[`${base}_CLIENT_ID`] ?? ''
      }
    ];
  }, []);
};

const options = getOptions(process.env);

const EnvironmentToggleTool: React.FC<Record<string, never>> = () => {
  const [selectedOption, setSelectedOption] = React.useState(0);

  const localStorageEnv = storage.devToolsEnv.get();
  const currentEnvLabel = localStorageEnv?.label;

  return (
    <Grid container>
      <Grid item xs={12}>
        <h4 style={{ marginBottom: 8 }}>Environment</h4>
      </Grid>
      <Grid item xs={12}>
        <select
          onBlur={(e) => {
            const selectedIndex = options.findIndex(
              (o) => o.label === e.target.value
            );
            setSelectedOption(Math.max(selectedIndex, 0));
          }}
          defaultValue={currentEnvLabel}
          style={{ marginRight: 8 }}
          placeholder="Select an environment">
          {options.map((thisOption) => {
            const { label } = thisOption;
            return (
              <option key={label} value={label}>
                {label}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            const selected = options[selectedOption];
            if (selected) {
              storage.devToolsEnv.set(selected);
              window.location.reload();
            }
          }}>
          Refresh
        </button>
      </Grid>
    </Grid>
  );
};

export default React.memo(EnvironmentToggleTool);
