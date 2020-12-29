import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from './useStyles';

const Game = ({ game }) => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [defusingCard, setDefusingCard] = useState(0);

  const [gameStatus, setGameStatus] = useState({
    played: 0,
    win: 0,
    loose: 0,
    status: 'loading',
  });

  const startGame = (game) => {
    let GetCards = [];
    let defusing = 0;

    if (game?.savedGame && game?.savedGame?.cards?.length > 0) {
      const { savedGame, played, win, loose } = game;
      GetCards = [...savedGame.cards];
      defusing = savedGame.defusingCard;

      setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
        played,
        win,
        loose,
        status: 'running',
      }));
    } else {
      const gameCards = ['cat', 'bomb', 'defusing', 'shuffle'];

      for (let i = 0; i < 5; i++) {
        const index = Math.round(Math.random() * 3);

        GetCards.push(gameCards[index]);
      }

      setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
        status: 'running',
      }));
    }

    setCards([...GetCards]);
    setDefusingCard(defusing);
  };

  useEffect(() => {
    if (game?.username) startGame(game);
  }, [game]);

  const drawCardHandler = (e) => {
    e.target.style.transform = 'rotateY(180deg)';

    setTimeout(() => {
      runGameLogic();
    }, 500);
  };

  const runGameLogic = () => {
    const leftCards = cards;
    const lastCard = leftCards.pop();

    if (lastCard === 'shuffle') {
      setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
        status: 'restarting',
      }));

      setTimeout(() => {
        startGame();
      }, 1000);

      return true;
    } else if (lastCard === 'defusing') {
      setDefusingCard((deCard) => deCard + 1);
    } else if (lastCard === 'bomb') {
      if (defusingCard > 0) {
        setDefusingCard((deCard) => deCard - 1);
      } else {
        return setGameStatus((oldGameStatus) => ({
          ...oldGameStatus,
          played: oldGameStatus.played + 1,
          loose: oldGameStatus.loose + 1,
          status: 'loose',
        }));
      }
    }
    setCards([...leftCards]);

    if (leftCards.length === 0) {
      return setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
        played: oldGameStatus.played + 1,
        win: oldGameStatus.win + 1,
        status: 'win',
      }));
    }
  };

  return (
    <Box position="relative">
      <Typography paragraph>{gameStatus.status}</Typography>
      <Box position="relative">
        {gameStatus.status === 'running' &&
          cards.map((card, key) => (
            <Box className={classes.root} zIndex={key} key={key + card}>
              <Box className={classes.flipCardInner} onClick={drawCardHandler}>
                <Box className={classes.flipCardFront}></Box>
                <Box className={classes.flipCardBack}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {card}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
      <Typography paragraph>{cards.length} cards left</Typography>

      <Box mt={10}>
        <Typography>user : {game.username}</Typography>
        <Typography>played : {gameStatus.played}</Typography>
        <Typography>win: {gameStatus.win}</Typography>
        <Typography>loose: {gameStatus.loose}</Typography>
      </Box>
      {(gameStatus.status === 'loose' || gameStatus.status === 'win') && (
        <Button onClick={() => startGame()} variant="contained">
          Click Here to play Again
        </Button>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Game);
