import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDomains } from 'src/store/domains/domains.actions';
import { ApplicationState } from 'src/store';

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state: ApplicationState) => state.__resources);

  React.useEffect(() => {
    console.log(counter);
  }, [counter]);

  const a = () => dispatch(getDomains());
  return (
    <div className="App" onClick={a} role="button" tabIndex={0} onKeyDown={a}>
      aaaa
    </div>
  );
}

export default App;
