import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 280,
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'white',
    backgroundColor: 'transparent',
    perspective: '1000px',
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.4s',
    transformStyle: 'preserve-3d',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },

  flipCardFront: {
    backgroundColor: '#bbb',
    color: 'black',
    position: '<i class="fas fa-value-absolute"></i>',
    width: '100%',
    height: '100%',
    '-webkit-backface-visibility': 'hidden',
    backfaceVisibility: 'hidden',
  },

  flipCardBack: {
    backgroundColor: '#2980b9',
    color: 'white',
    transform: 'rotateY(180deg)',
    position: '<i class="fas fa-value-absolute"></i>',
    width: '100%',
    height: '100%',
    '-webkit-backface-visibility': 'hidden',
    backfaceVisibility: 'hidden',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Game = ({ userName }) => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [defusingCard, setDefusingCard] = useState(0);
  const [gameStatus, setGameStatus] = useState({
    played: 0,
    win: 0,
    loose: 0,
    status: '',
  });

  const startGame = (e, type = 'new') => {
    const gameCards = ['cat', 'bomb', 'defusing', 'shuffle'];
    const GetCards = [];

    for (let i = 0; i < 5; i++) {
      const index = Math.round(Math.random() * 3);

      GetCards.push(gameCards[index]);
    }

    setCards([...GetCards]);
    setDefusingCard(0);

    setGameStatus((oldGameStatus) => ({
      ...oldGameStatus,
      status: 'running',
    }));

    console.log(type);

    if (type === 'new') {
      setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
        played: oldGameStatus.played + 1,
      }));
    }
  };

  useEffect(() => {
    startGame();
  }, []);

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
        startGame(null, 'restart');
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
          loose: oldGameStatus.loose + 1,
          status: 'loose',
        }));
      }
    }
    setCards([...leftCards]);

    if (leftCards.length === 0) {
      return setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
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
        <Typography>user : {userName}</Typography>
        <Typography>played : {gameStatus.played}</Typography>
        <Typography>win: {gameStatus.win}</Typography>
        <Typography>loose: {gameStatus.loose}</Typography>
      </Box>
      {(gameStatus.status === 'loose' || gameStatus.status === 'win') && (
        <Button onClick={startGame} variant="contained">
          Click Here to play Again
        </Button>
      )}
    </Box>
  );
};

export default Game;
