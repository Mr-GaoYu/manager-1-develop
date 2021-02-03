import React from 'react';
import { useDispatch } from 'react-redux';
import { createDomainActions } from 'src/store/domains/domains.actions';

function App() {
  const dispatch = useDispatch();
  dispatch(
    createDomainActions({
      domain: 'assa',
      type: 'master',
      master_ips: ['asd'],
      soa_email: 'assa',
      tags: ['asd']
    })
  );
  return <div className="App"> asdasdas </div>;
}

export default App;
