import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'src/store';
import { handleStartSession } from 'src/store/authentication/authentication.actions';

const AuthenticationWrapper: React.FC = () => {
  // const [showChildren, setShowChildren] = React.useState<Boolean>(false);

  // const [hasEnsuredAllTypes, setHasEnsuredAllTypes] = React.useState<Boolean>(false);

  const dispatch = useDispatch();
  const counter = useSelector((state: ApplicationState) => state);

  React.useEffect(() => {
    console.log(counter);
  }, [counter]);

  const a = () =>
    dispatch(
      handleStartSession({
        token: 'asdasd',
        scopes: 'asdasd',
        expires: 'asdasd'
      })
    );

  return (
    <div className="App" onClick={a} role="button" tabIndex={0} onKeyDown={a}>
      333333333
    </div>
  );
};

AuthenticationWrapper.defaultProps = {
  isAuthenticated: false
};

export default AuthenticationWrapper;
