import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Home from './components/Home';
import Game from './components/Game';

import './App.css';

const App = ({ game }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(game?.username);
  }, [game]);

  if (userName) return <Game />;

  return <Home />;
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(App);
