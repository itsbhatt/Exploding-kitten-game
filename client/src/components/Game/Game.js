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

const Game = () => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [defusingCard, setDefusingCard] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const gameCards = ['cat', 'bomb', 'defusing', 'shuffle'];
    const GetCards = [];

    for (let i = 0; i < 5; i++) {
      const index = Math.round(Math.random() * 3);

      GetCards.push(gameCards[index]);
    }

    setCards([...GetCards]);
    setGameStatus('running');
  };

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
      setGameStatus('restarting');

      setTimeout(() => {
        startGame();
      }, 2000);

      return true;
    } else if (lastCard === 'defusing') {
      setDefusingCard((deCard) => deCard + 1);
    } else if (lastCard === 'bomb') {
      if (defusingCard > 0) {
        setDefusingCard((deCard) => deCard - 1);
      } else {
        return setGameStatus('loose');
      }
    }
    setCards([...leftCards]);

    if (leftCards.length === 0) {
      setGameStatus('win');
    }
  };

  return (
    <Box position="relative">
      <Typography paragraph>{gameStatus}</Typography>
      <Box position="relative">
        {gameStatus === 'running' &&
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
      {gameStatus !== 'loose' ||
        (gameStatus !== 'win' && (
          <Button onClick={startGame} variant="contained">
            Click Here to play Again
          </Button>
        ))}
    </Box>
  );
};

export default Game;
