import React, { useEffect, useState } from 'react';

const Game = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const gameCards = ['cat', 'bomb', 'defusing', 'shuffle'];
    const GetCards = [];

    for (let i = 0; i < 5; i++) {
      const index = Math.round(Math.random() * 3);

      GetCards.push(gameCards[index]);
    }

    setCards([...GetCards]);
  }, [setCards]);

  return (
    <div>
      {cards.map((card, key) => (
        <p key={key}>{card}</p>
      ))}
    </div>
  );
};

export default Game;
