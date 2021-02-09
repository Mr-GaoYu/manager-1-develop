import React from 'react';
import { Action } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from 'src/store';
import { MapState } from 'src/store/types';
import { handleInitTokens } from 'src/store/authentication/authentication.actions';

type CombinedProps = StateProps & DispatchProps;

const defaultProps: Partial<CombinedProps> = {
  isAuthenticated: false
};

const AuthenticationWrapper: React.FC<CombinedProps> = (props) => {
  const { isAuthenticated } = props;

  const [showChildren, setShowChildren] = React.useState<boolean>(false);

  const makeInitialRequests = React.useCallback(() => {
    if (window.location?.pathname?.match(/ruas\/[0-9]+\/lish/)) {
      return;
    }
  }, []);

  const ensureAllTypes = React.useCallback(() => {
    return;
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) {
      setShowChildren(true);
      makeInitialRequests();
      ensureAllTypes();
    }
  }, [isAuthenticated, makeInitialRequests]);

  return (
    <React.Fragment>{showChildren ? props.children : null}</React.Fragment>
  );
};

AuthenticationWrapper.defaultProps = defaultProps;
AuthenticationWrapper.displayName = 'AuthenticationWrapper';

interface StateProps {
  isAuthenticated: boolean;
}

const mapStateToProps: MapState<StateProps, {}> = (state) => ({
  isAuthenticated: Boolean(state.authentication.token)
});

interface DispatchProps {
  initSession: () => void;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<ApplicationState, undefined, Action<any>>
) => ({
  initSession: () => dispatch(handleInitTokens())
});

const connected = connect(mapStateToProps, mapDispatchToProps);

export default connected(AuthenticationWrapper);
