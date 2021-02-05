import React from 'react';
import { useDispatch } from 'react-redux';
import { createDomainActions } from 'src/store/domains/domains.actions';

function App() {
  const dispatch = useDispatch();
  dispatch(
    createDomainActions({
      domain: '192.168.88',
      type: 'master'
    })
  );

  return <div className="App"> asdasdas </div>;
}

export default App;
