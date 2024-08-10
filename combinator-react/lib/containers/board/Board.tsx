import React, { useState, useEffect } from "react";
import Card, { CardProps } from "../../components/card/Card";

interface BoardProps {
  cards: CardProps[];
}

const Board: React.FC<BoardProps> = ({ cards }) => {
  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card key={index} name={card.name} position={card.position} />
      ))}
    </div>
  );
};

export default Board;
