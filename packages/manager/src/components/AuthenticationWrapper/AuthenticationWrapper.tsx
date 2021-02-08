import React from 'react';

const AuthenticationWrapper: React.FC<{}> = (props) => {
  const [showChildren] = React.useState<boolean>(false);

  return (
    <React.Fragment>{showChildren ? props.children : null}</React.Fragment>
  );
};

AuthenticationWrapper.defaultProps = {
  isAuthenticated: false
};
AuthenticationWrapper.displayName = 'AuthenticationWrapper';

export default AuthenticationWrapper;
