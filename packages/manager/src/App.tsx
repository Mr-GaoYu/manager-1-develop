import React from 'react';
import { useDispatch } from 'react-redux';
// import { getDomainPageActions } from 'src/store/domains/domains.actions';

function App() {
  const dispatch = useDispatch();
  const a = () => (d: any) => console.log(d, 2222);
  dispatch(a());

  return <div className="App"> asdasdas </div>;
}

export default App;
