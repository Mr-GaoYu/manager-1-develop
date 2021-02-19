import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import composeState from 'src/utilities/composeState';
import { connect } from 'react-redux';
import { MapState } from './store/types';
import { compose } from 'redux';
import { withSnackbar } from 'notistack';
import { pathOr } from 'ramda';
import { APIError } from '@rua/api-v1/lib/types';

interface State {
  menuOpen: boolean;
  welcomeBanner: boolean;
  hasError: boolean;
  goToOpen: boolean;
}
interface Props {
  toggleTheme: () => void;
  toggleSpacing: () => void;
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
}

type CombinedProps = Props;
export class App extends React.Component<CombinedProps, State> {
  composeState = composeState;

  state: State = {
    menuOpen: false,
    welcomeBanner: false,
    hasError: false,
    goToOpen: false
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  componentDidMount() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        this.props.toggleTheme();
      }

      if (event.ctrlKey && event.shiftKey && event.key === 'K') {
        this.setState((prevState) => ({
          ...prevState,
          goToOpen: !prevState.goToOpen
        }));
      }
    });
  }

  goToClose = () => {
    this.setState({ goToOpen: false });
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return 1;
    }

    return <div>2</div>;
  }
}

interface StateProps {}

const mapStateToProps: MapState<StateProps, Props> = (state) => ({});

export const connected = connect(mapStateToProps);

export default compose(connected, withSnackbar)(App);

export const hasOauthError = (...args: (Error | APIError[] | undefined)[]) => {
  return args.some((eachError) => {
    const cleanedError: string | JSX.Element = pathOr(
      '',
      [0, 'reason'],
      eachError
    );

    return typeof cleanedError !== 'string'
      ? false
      : cleanedError.toLowerCase().includes('oauth');
  });
};
