import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import composeState from 'src/utilities/composeState';
import { connect } from 'react-redux';
import { MapState } from './store/types';
import { compose } from 'redux';
import { withSnackbar } from 'notistack';
import { pathOr } from 'ramda';
import { APIError } from '@rua/api-v1/lib/types';
import {
  DocumentTitleSegment,
  withDocumentTitleProvider
} from 'src/components/DocumentTitle';
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

    return (
      <React.Fragment>
        <a href="#main-navigation" className="visually-hidden">
          Skip to main navigation
        </a>
        <a href="#main-content" className="visually-hidden">
          Skip to main content
        </a>
        <div hidden>
          <span id="new-window">Opens in a new window</span>
          <span id="external-site">Opens an external site</span>
          <span id="external-site-new-window">
            Opens an external site in a new window
          </span>
        </div>

        <DocumentTitleSegment segment="Linode Manager" />
      </React.Fragment>
    );
  }
}

interface StateProps {}

const mapStateToProps: MapState<StateProps, Props> = (state) => ({});

export const connected = connect(mapStateToProps);

export default compose(connected, withDocumentTitleProvider, withSnackbar)(App);

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
