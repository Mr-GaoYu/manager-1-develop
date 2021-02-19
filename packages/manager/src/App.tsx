import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import composeState from 'src/utilities/composeState';

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
    const {hasError} = this.state

    if(hasError){
      return 1
    }

    return <div>2</div>;
  }
}

export default App;
