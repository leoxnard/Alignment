import React from 'react';
import './App.css';
import Allignment from './Allignment/Body';
import MSA from './MSA/BodyMSA';

function App() {
  const [mode, setMode] = React.useState(0);

  const handleChangeMode = (mode) => {
    setMode(mode);
  }

  if (mode === 0) {
    return (
      <div className="App">
        <Allignment changeMode={() => handleChangeMode(1)}/>
      </div>
    );
  }
  return (
    <div className="App">
      <MSA changeMode={() => handleChangeMode(0)}/>
    </div>
  );
}

export default App;
