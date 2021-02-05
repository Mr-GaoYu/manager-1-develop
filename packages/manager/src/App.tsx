import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDomainActions } from 'src/store/domains/domains.actions';
import { ApplicationState } from 'src/store';

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state: ApplicationState) => state.__resources);

  React.useEffect(() => {
    console.log(counter);
  }, [counter]);

  const a = () =>
    dispatch(
      createDomainActions({
        domain: '192.168.88.225',
        type: 'master'
      })
    );
  return (
    <div className="App" onClick={a} role="button" tabIndex={0} onKeyDown={a}>
      aaaa
    </div>
  );
}

export default App;
