import React from 'react';
import { Action } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from 'src/store';
import { MapState } from 'src/store/types';
import { handleInitTokens } from 'src/store/authentication/authentication.actions';

type CombinedProps = StateProps & DispatchProps;

export class AuthenticationWrapper extends React.Component<CombinedProps> {
  state = {
    showChildren: false,
    hasEnsuredAllTypes: false
  };

  static defaultProps = {
    isAuthenticated: false
  };

  makeInitialRequests = () => {
    return;
  };

  makeSecondaryRequests = () => {
    return;
  };

  componentDidMount() {
    const { initSession } = this.props;

    initSession();

    if (this.props.isAuthenticated) {
      this.setState({ showChildren: true });

      this.makeInitialRequests();
    }
  }

  componentDidUpdate(prevProps: CombinedProps) {
    if (
      !prevProps.isAuthenticated &&
      this.props.isAuthenticated &&
      !this.state.showChildren
    ) {
      this.makeInitialRequests();

      return this.setState({ showChildren: true });
    }
  }

  render() {
    const { children } = this.props;
    const { showChildren } = this.state;
    return <React.Fragment>{showChildren ? children : null}</React.Fragment>;
  }
}
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
