import React, { useState, useEffect } from 'react';
import './App.css';

import Home from './components/Home';
import Game from './components/Game';

function App() {
  const [userName, setUserName] = useState('');

  useEffect(() => {}, [userName]);

  if (userName) return <Game userName={userName} />;

  return <Home setUser={(val) => setUserName(val)} />;
}

export default App;
