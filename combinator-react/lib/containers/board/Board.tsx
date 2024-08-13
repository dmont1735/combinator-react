import React, { useState, useEffect } from "react";
import Card, { CardProps } from "../../components/card/Card";

interface BoardProps {
  initialCards: CardProps[];
}

const Board: React.FC<BoardProps> = ({ initialCards }) => {
  const [cards, setCards] = useState<CardProps[]>(initialCards);

  const handleSetPosition = (
    index: number,
    newPosition: { x: number; y: number }
  ) => {
    setCards((previousCards) => {
      let updatedCards = [...previousCards];
      updatedCards[index].position = newPosition;
      return updatedCards;
    });
  };

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          position={card.position}
          setPosition={(newPosition: { x: number; y: number }) => {
            handleSetPosition(index, newPosition);
          }}
        />
      ))}
    </div>
  );
};

export default Board;
