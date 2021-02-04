import React from 'react';
import { useDispatch } from 'react-redux';
import { getDomainActions } from 'src/store/domains/domains.actions';

function App() {
  const dispatch = useDispatch();
  dispatch(getDomainActions());

  return <div className="App"> asdasdas </div>;
}

export default App;
