import React from 'react';

interface AuthenticationWrapperProps {}

const defaultProps: Partial<AuthenticationWrapperProps> = {
  isAuthenticated: false
};

type CombinedProps = AuthenticationWrapperProps;

const AuthenticationWrapper: React.FC<CombinedProps> = (props) => {
  const [showChildren] = React.useState<boolean>(false);

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
