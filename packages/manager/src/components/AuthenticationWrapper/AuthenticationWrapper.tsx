import React from 'react';
import { Action } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from 'src/store';
import { MapState } from 'src/store/types';
import { handleInitTokens } from 'src/store/authentication/authentication.actions';
import { requestAccount } from 'src/store/account/account.requests';
import { requestProfile } from 'src/store/profile/profile.requests';
import { checkAccountSize } from 'src/store/accountManagement/accountManagement.requests';
import { Account } from '@rua/api-v1/lib/account';

type CombinedProps = StateProps & DispatchProps;

export class AuthenticationWrapper extends React.Component<CombinedProps> {
  state = {
    showChildren: false,
    hasEnsuredAllTypes: false
  };

  static defaultProps = {
    isAuthenticated: false
  };

  makeInitialRequests = async () => {
    if (window.location?.pathname?.match(/ruas\/[0-9]+\/lish/)) {
      return;
    }

    // const dataFetchingPromises = []
  };

  componentDidMount() {
    // 初始化 Session
    const { initSession } = this.props;
    initSession();

    // 初始化请求

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
  requestAccount: () => Promise<Account>;
  checkAccountSize: () => Promise<null>;
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: ThunkDispatch<ApplicationState, undefined, Action<any>>
) => ({
  initSession: () => dispatch(handleInitTokens()),
  checkAccountSize: () => dispatch(checkAccountSize()),
  requestAccount: () => dispatch(requestAccount()),
  requestProfile: () => dispatch(requestProfile())
});

const connected = connect(mapStateToProps, mapDispatchToProps);

export default connected(AuthenticationWrapper);
