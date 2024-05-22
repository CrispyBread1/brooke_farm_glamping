import './App.css';
import React, { useState } from 'react';
import HomePage from './Containers/homePage';

function App() {

  const [home, setHome] = useState(true)

  return (

    <div className="Rendering pages">
      {home && <HomePage />}
    </div>
  );

}

export default App;
