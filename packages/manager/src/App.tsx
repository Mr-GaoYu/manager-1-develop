import React from 'react';
import { useSnackbar } from 'notistack';

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love hooks');
  };

  return (
    <button className="App" onClick={handleClick}>
      aaaa
    </button>
  );
}

export default App;
