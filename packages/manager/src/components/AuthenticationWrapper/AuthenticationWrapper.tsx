import React from 'react';

interface AuthenticationWrapperProps {
  isAuthenticated?: boolean;
}

const defaultProps: Partial<AuthenticationWrapperProps> = {
  isAuthenticated: false
};

type CombinedProps = AuthenticationWrapperProps;

const AuthenticationWrapper: React.FC<CombinedProps> = (props) => {
  const [showChildren, setShowChildren] = React.useState<boolean>(false);

  const makeInitialRequests = () => {
    if (window.location?.pathname?.match(/ruas\/[0-9]+\/lish/)) {
      return;
    }
  };

  React.useEffect(() => {
    if (props.isAuthenticated) {
      setShowChildren(true);
      makeInitialRequests();
    }
  }, [props.isAuthenticated]);

  return (
    <React.Fragment>{showChildren ? props.children : null}</React.Fragment>
  );
};

// interface StateProps {
//   isAuthenticated: boolean;
//   ruaLoading: boolean;
//   ruaLastUpdated: number;

// }

AuthenticationWrapper.defaultProps = defaultProps;
AuthenticationWrapper.displayName = 'AuthenticationWrapper';

export default AuthenticationWrapper;
